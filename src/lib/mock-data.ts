import type { Artist, Event, Neighborhood, Review, UndergroundParty, User, Venue } from "./types";

export const users: User[] = [
  {
    id: "u1",
    username: "neon_nina",
    displayName: "Nina K.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    bio: "Brooklyn techno head. Always chasing the sunrise set.",
    reviewCount: 47,
    joinedAt: "2024-03-15",
  },
  {
    id: "u2",
    username: "bassline_ben",
    displayName: "Ben Torres",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "House music evangelist. Bushwick regular.",
    reviewCount: 31,
    joinedAt: "2024-01-08",
  },
  {
    id: "u3",
    username: "warehouse_wolf",
    displayName: "Alex M.",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Documenting NYC nightlife one party at a time.",
    reviewCount: 62,
    joinedAt: "2023-11-22",
  },
  {
    id: "u4",
    username: "strobe_sam",
    displayName: "Sam Rivera",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "DJ and reviewer. If the sound is muddy, you'll hear about it.",
    reviewCount: 28,
    joinedAt: "2024-06-01",
  },
];

export const venues: Venue[] = [
  {
    id: "v1",
    slug: "basement",
    name: "Basement",
    neighborhood: "Ridgewood",
    borough: "Queens",
    address: "Basement, Ridgewood, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1571266028247-a1100fed8a22?w=800&h=600&fit=crop",
    capacity: 400,
    tags: ["Techno", "Warehouse", "Late Night"],
    averageRating: 4.7,
    reviewCount: 128,
  },
  {
    id: "v2",
    slug: "superior-ingredients",
    name: "Superior Ingredients",
    neighborhood: "Williamsburg",
    borough: "Brooklyn",
    address: "592 Lorimer St, Brooklyn, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    capacity: 800,
    tags: ["House", "Rooftop", "Day Party"],
    averageRating: 4.5,
    reviewCount: 94,
  },
  {
    id: "v3",
    slug: "knockdown-center",
    name: "Knockdown Center",
    neighborhood: "Maspeth",
    borough: "Queens",
    address: "52-19 Flushing Ave, Queens, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    capacity: 2000,
    tags: ["Festival", "Multi-Genre", "Art Space"],
    averageRating: 4.4,
    reviewCount: 76,
  },
  {
    id: "v4",
    slug: "public-records",
    name: "Public Records",
    neighborhood: "Gowanus",
    borough: "Brooklyn",
    address: "233 Butler St, Brooklyn, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1598387181032-a31006289f5a?w=800&h=600&fit=crop",
    capacity: 350,
    tags: ["House", "Jazz", "Listening Room"],
    averageRating: 4.8,
    reviewCount: 112,
  },
  {
    id: "v5",
    slug: "nowadays",
    name: "Nowadays",
    neighborhood: "Ridgewood",
    borough: "Queens",
    address: "56-06 Cooper Ave, Queens, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    capacity: 600,
    tags: ["Outdoor", "House", "Community"],
    averageRating: 4.6,
    reviewCount: 156,
  },
  {
    id: "v6",
    slug: "output-brooklyn",
    name: "Output (Legacy)",
    neighborhood: "Williamsburg",
    borough: "Brooklyn",
    address: "74 Wythe Ave, Brooklyn, NY",
    imageUrl:
      "https://images.unsplash.com/photo-1571330737116-fde09ada7e47?w=800&h=600&fit=crop",
    capacity: 900,
    tags: ["Techno", "Iconic", "Sound System"],
    averageRating: 4.9,
    reviewCount: 203,
  },
];

export const artists: Artist[] = [
  {
    id: "a1",
    slug: "charlotte-de-witte",
    name: "Charlotte de Witte",
    genre: ["Techno", "Dark Techno"],
    imageUrl:
      "https://images.unsplash.com/photo-1574169208507-84376145048b?w=800&h=600&fit=crop",
    bio: "Belgian techno powerhouse known for relentless, driving sets.",
    averageRating: 4.8,
    reviewCount: 89,
  },
  {
    id: "a2",
    slug: "the-martinez-brothers",
    name: "The Martinez Brothers",
    genre: ["House", "Tech House"],
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
    bio: "NYC-born duo bringing soulful house to the world's biggest stages.",
    averageRating: 4.7,
    reviewCount: 72,
  },
  {
    id: "a3",
    slug: "peggy-gou",
    name: "Peggy Gou",
    genre: ["House", "Electro"],
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    bio: "Korean DJ/producer blending eclectic sounds with infectious energy.",
    averageRating: 4.6,
    reviewCount: 65,
  },
  {
    id: "a4",
    slug: "dj-holographic",
    name: "DJ Holographic",
    genre: ["House", "Disco"],
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    bio: "Detroit-born selector bringing warmth and groove to every room.",
    averageRating: 4.5,
    reviewCount: 41,
  },
  {
    id: "a5",
    slug: "adam-beyer",
    name: "Adam Beyer",
    genre: ["Techno"],
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
    bio: "Drumcode founder and Swedish techno legend.",
    averageRating: 4.7,
    reviewCount: 58,
  },
];

export const events: Event[] = [
  {
    id: "e1",
    slug: "charlotte-basement-june",
    title: "Charlotte de Witte — Basement",
    date: "2025-06-14",
    venueId: "v1",
    artistIds: ["a1"],
    imageUrl:
      "https://images.unsplash.com/photo-1571266028247-a1100fed8a22?w=800&h=600&fit=crop",
    genre: ["Techno"],
    ticketPrice: "$45–65",
    averageRating: 4.9,
    reviewCount: 34,
  },
  {
    id: "e2",
    slug: "martinez-brothers-superior",
    title: "The Martinez Brothers at Superior Ingredients",
    date: "2025-06-21",
    venueId: "v2",
    artistIds: ["a2"],
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    genre: ["House", "Tech House"],
    ticketPrice: "$35–50",
    averageRating: 4.6,
    reviewCount: 22,
  },
  {
    id: "e3",
    slug: "peggy-gou-knockdown",
    title: "Peggy Gou — Knockdown Center",
    date: "2025-07-04",
    venueId: "v3",
    artistIds: ["a3"],
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    genre: ["House", "Electro"],
    ticketPrice: "$55–75",
    averageRating: 4.5,
    reviewCount: 18,
  },
  {
    id: "e4",
    slug: "holographic-public-records",
    title: "DJ Holographic — Public Records",
    date: "2025-06-28",
    venueId: "v4",
    artistIds: ["a4"],
    imageUrl:
      "https://images.unsplash.com/photo-1598387181032-a31006289f5a?w=800&h=600&fit=crop",
    genre: ["House", "Disco"],
    ticketPrice: "$25–35",
    averageRating: 4.8,
    reviewCount: 15,
  },
  {
    id: "e5",
    slug: "beyer-nowadays-summer",
    title: "Adam Beyer — Nowadays Summer Series",
    date: "2025-08-02",
    venueId: "v5",
    artistIds: ["a5"],
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    genre: ["Techno"],
    ticketPrice: "$40–55",
    averageRating: 4.7,
    reviewCount: 11,
  },
  {
    id: "e6",
    slug: "warehouse-all-nighter",
    title: "Warehouse All-Nighter: Multi-Artist",
    date: "2025-06-07",
    venueId: "v1",
    artistIds: ["a1", "a5"],
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    genre: ["Techno"],
    ticketPrice: "$30–40",
    averageRating: 4.4,
    reviewCount: 27,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    userId: "u1",
    eventId: "e1",
    venueId: "v1",
    artistId: "a1",
    title: "Peak-time perfection at Basement",
    body: "Charlotte delivered one of the most focused techno sets I've heard in NYC. The sound at Basement is unreal — every kick hits your chest without drowning the hi-hats. Crowd was respectful, no phone zombies during the peak. Got in around 1am and the energy didn't drop until sunrise.",
    overallRating: 5,
    soundRating: 5,
    vibeRating: 5,
    crowdRating: 4,
    valueRating: 4,
    tags: ["Peak Time", "Sound Quality", "Sunrise Set"],
    helpfulCount: 42,
    createdAt: "2025-06-15",
  },
  {
    id: "r2",
    userId: "u2",
    eventId: "e2",
    venueId: "v2",
    artistId: "a2",
    title: "Martinez Brothers brought the heat on the roof",
    body: "Superior Ingredients never misses for a summer house party. The Martinez Brothers played a 3-hour journey — deep cuts, classic NY house, and some unexpected edits. Only downside was the bar line during peak hours. Views of Manhattan at golden hour were chef's kiss.",
    overallRating: 4,
    soundRating: 4,
    vibeRating: 5,
    crowdRating: 4,
    valueRating: 3,
    tags: ["Rooftop", "House Classics", "Long Set"],
    helpfulCount: 28,
    createdAt: "2025-06-22",
  },
  {
    id: "r3",
    userId: "u3",
    venueId: "v4",
    title: "Public Records is NYC's best listening room",
    body: "Even without a headliner, Public Records is worth the trip. The sound system is tuned for clarity, not just volume. Staff actually cares about the experience. Perfect for when you want to dance but also hear every detail in the mix.",
    overallRating: 5,
    soundRating: 5,
    vibeRating: 5,
    crowdRating: 5,
    valueRating: 4,
    tags: ["Sound Quality", "Intimate", "Staff"],
    helpfulCount: 56,
    createdAt: "2025-06-10",
  },
  {
    id: "r4",
    userId: "u4",
    artistId: "a4",
    eventId: "e4",
    venueId: "v4",
    title: "Holographic's groove is unmatched",
    body: "DJ Holographic doesn't just play records — she tells a story. Warm, disco-inflected house that had the whole room moving without any pyrotechnics needed. Public Records' intimate room was the perfect fit. Left with a smile and sore feet.",
    overallRating: 5,
    soundRating: 5,
    vibeRating: 5,
    crowdRating: 4,
    valueRating: 5,
    tags: ["Groove", "Disco", "Storytelling"],
    helpfulCount: 19,
    createdAt: "2025-06-29",
  },
  {
    id: "r5",
    userId: "u1",
    eventId: "e6",
    venueId: "v1",
    artistId: "a5",
    title: "Solid warehouse night, long lines though",
    body: "The music was fire — Beyer and Charlotte back-to-back was a dream lineup. But the entry process was chaotic and the bathroom situation at 4am was rough. Still, for the price, hard to beat a full night of proper techno in Ridgewood.",
    overallRating: 4,
    soundRating: 5,
    vibeRating: 4,
    crowdRating: 3,
    valueRating: 5,
    tags: ["Lineup", "Value", "Logistics"],
    helpfulCount: 33,
    createdAt: "2025-06-08",
  },
  {
    id: "r6",
    userId: "u2",
    artistId: "a2",
    title: "The Martinez Brothers live up to the hype",
    body: "Caught them at Output back in the day and they're still at the top of their game. Seamless mixing, crowd reading on point, and they always drop something you haven't heard. If they're on the bill, just go.",
    overallRating: 5,
    soundRating: 4,
    vibeRating: 5,
    crowdRating: 5,
    valueRating: 4,
    tags: ["Crowd Reading", "NY Legends", "Must See"],
    helpfulCount: 47,
    createdAt: "2025-05-18",
  },
  {
    id: "r7",
    userId: "u3",
    eventId: "e3",
    venueId: "v3",
    artistId: "a3",
    title: "Peggy Gou at Knockdown — festival vibes",
    body: "Massive production, incredible visuals, and Peggy brought the energy. Knockdown handled the crowd well for 2000+ people. Sound was good but lost some punch toward the back. Front-left speaker stack is the move.",
    overallRating: 4,
    soundRating: 3,
    vibeRating: 5,
    crowdRating: 4,
    valueRating: 4,
    tags: ["Production", "Festival Scale", "Visuals"],
    helpfulCount: 21,
    createdAt: "2025-07-05",
  },
  {
    id: "r8",
    userId: "u4",
    venueId: "v5",
    title: "Nowadays backyard sessions hit different",
    body: "There's something magical about dancing under the stars in Ridgewood. The community vibe is real — you'll meet people, not just stare at your phone. Sound outdoors isn't perfect but the atmosphere more than makes up for it.",
    overallRating: 5,
    soundRating: 3,
    vibeRating: 5,
    crowdRating: 5,
    valueRating: 5,
    tags: ["Outdoor", "Community", "Summer"],
    helpfulCount: 38,
    createdAt: "2025-06-20",
  },
];

export const undergroundParties: UndergroundParty[] = [
  {
    id: "up1",
    slug: "warehouse-signal-bushwick",
    title: "SIGNAL — Warehouse Session",
    description:
      "Raw warehouse techno until sunrise. Funktion-One stack, no phones on the floor policy. Bring cash for the door.",
    submittedByUserId: "u3",
    date: "2025-07-12",
    startTime: "23:00",
    endTime: "06:00",
    genre: ["Techno", "Hard Techno"],
    lineup: ["Verraco", "Nympha", "TBA B2B"],
    locationVague: true,
    vagueArea: "East Bushwick",
    locationHint: "Details shared day-of via IG close friends list",
    borough: "Brooklyn",
    ticketInfo: "$20–25 cash at door",
    status: "approved",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    createdAt: "2025-06-18",
  },
  {
    id: "up2",
    slug: "loft-frequency-manhattan",
    title: "FREQUENCY Loft",
    description:
      "Intimate loft party — max 80 people. Deep house and minimal all night. RSVP required, location sent after approval.",
    submittedByUserId: "u1",
    date: "2025-07-19",
    startTime: "22:00",
    endTime: "04:00",
    genre: ["House", "Minimal"],
    lineup: ["DJ Sprinkles (special set)", "Physical Therapy"],
    locationVague: true,
    vagueArea: "Lower East Side",
    locationHint: "Within 10 min walk of Delancey/Essex",
    borough: "Manhattan",
    ticketInfo: "Invite only — DM for RSVP",
    status: "approved",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    createdAt: "2025-06-22",
  },
  {
    id: "up3",
    slug: "ridgewood-bunker-july",
    title: "BUNKER: Ridgewood Industrial",
    description:
      "Monthly underground series in a converted industrial space. This month: breaks and electro. Proper sound, zero fluff.",
    submittedByUserId: "u2",
    date: "2025-07-05",
    startTime: "00:00",
    endTime: "08:00",
    genre: ["Breaks", "Electro", "Techno"],
    lineup: ["Volvox", "J. Slasher", "Unica"],
    locationVague: false,
    address: "56-xx Industrial Ave",
    venueName: "The Bunker (undisclosed unit)",
    neighborhood: "Ridgewood",
    borough: "Queens",
    ticketInfo: "$15 before midnight, $20 after",
    status: "approved",
    imageUrl:
      "https://images.unsplash.com/photo-1571266028247-a1100fed8a22?w=800&h=600&fit=crop",
    createdAt: "2025-06-10",
  },
  {
    id: "up4",
    slug: "rooftop-transmission-brooklyn",
    title: "TRANSMISSION Rooftop",
    description:
      "Sunrise rooftop session overlooking the skyline. Disco, house, and whatever the night demands. BYOB friendly.",
    submittedByUserId: "u4",
    date: "2025-07-26",
    startTime: "04:00",
    endTime: "10:00",
    genre: ["Disco", "House"],
    lineup: ["DJ Holographic", "Analog Soul"],
    locationVague: true,
    vagueArea: "South Williamsburg",
    locationHint: "Rooftop access — pin dropped morning of",
    borough: "Brooklyn",
    ticketInfo: "Free with RSVP",
    status: "approved",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    createdAt: "2025-06-25",
  },
  {
    id: "up5",
    slug: "basement-afterhours-queens",
    title: "AFTER//HOURS Basement",
    description:
      "When the clubs close, we open. Strictly techno, strictly underground. 21+ with valid ID.",
    submittedByUserId: "u3",
    date: "2025-08-09",
    startTime: "05:00",
    endTime: "14:00",
    genre: ["Techno"],
    lineup: ["Local selectors TBA"],
    locationVague: false,
    address: "Undisclosed basement, near Myrtle-Wyckoff",
    neighborhood: "Bushwick",
    borough: "Brooklyn",
    ticketInfo: "$10 cash only",
    status: "approved",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
    createdAt: "2025-06-28",
  },
];

export const neighborhoods: Neighborhood[] = [
  { name: "Williamsburg", borough: "Brooklyn", eventCount: 24 },
  { name: "Ridgewood", borough: "Queens", eventCount: 31 },
  { name: "Bushwick", borough: "Brooklyn", eventCount: 18 },
  { name: "Gowanus", borough: "Brooklyn", eventCount: 12 },
  { name: "Lower East Side", borough: "Manhattan", eventCount: 15 },
  { name: "Chelsea", borough: "Manhattan", eventCount: 9 },
];

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
    avgRating: (
      reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length
    ).toFixed(1),
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
