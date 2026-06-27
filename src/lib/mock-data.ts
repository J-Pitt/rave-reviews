import type { Artist, Event, Neighborhood, Review, UndergroundParty, User, Venue } from "./types";

/** Empty fallback — content comes from the database or user submissions. */
export const users: User[] = [];
export const venues: Venue[] = [];
export const artists: Artist[] = [];
export const events: Event[] = [];
export const reviews: Review[] = [];
export const undergroundParties: UndergroundParty[] = [];
export const neighborhoods: Neighborhood[] = [];

export function getUser(id: string) {
  return users.find((u) => u.id === id);
}

export function getVenue(id: string) {
  return venues.find((v) => v.id === id);
}

export function getVenueBySlug(slug: string) {
  return venues.find((v) => v.slug === slug);
}

export function getArtist(id: string) {
  return artists.find((a) => a.id === id);
}

export function getArtistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}

export function getEvent(id: string) {
  return events.find((e) => e.id === id);
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getReviewsForVenue(venueId: string) {
  return reviews.filter((r) => r.venueId === venueId);
}

export function getReviewsForArtist(artistId: string) {
  return reviews.filter((r) => r.artistId === artistId);
}

export function getReviewsForEvent(eventId: string) {
  return reviews.filter((r) => r.eventId === eventId);
}

export function getEventsForVenue(venueId: string) {
  return events.filter((e) => e.venueId === venueId);
}

export function getEventsForArtist(artistId: string) {
  return events.filter((e) => e.artistIds.includes(artistId));
}

export function getTrendingEvents() {
  return [...events].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);
}

export function getTopVenues() {
  return [...venues].sort((a, b) => b.averageRating - a.averageRating).slice(0, 4);
}

export function getRecentReviews(limit = 6) {
  return [...reviews]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getStats() {
  return {
    totalReviews: reviews.length,
    totalVenues: venues.length,
    totalEvents: events.length,
    totalArtists: artists.length,
    totalUnderground: undergroundParties.length,
    avgRating:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length
          ).toFixed(1)
        : "—",
  };
}

export function getUndergroundPartyBySlug(slug: string) {
  return undergroundParties.find((p) => p.slug === slug);
}

export function getUpcomingUndergroundParties() {
  const now = new Date();
  return [...undergroundParties]
    .filter((p) => p.status === "approved" && new Date(p.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getFeaturedUndergroundParties(limit = 3) {
  return getUpcomingUndergroundParties().slice(0, limit);
}
