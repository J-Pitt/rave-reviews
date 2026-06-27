export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  reviewCount: number;
  joinedAt: string;
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  neighborhood: string;
  borough: string;
  address: string;
  imageUrl: string;
  capacity?: number;
  tags: string[];
  averageRating: number;
  reviewCount: number;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  genre: string[];
  imageUrl: string;
  bio: string;
  averageRating: number;
  reviewCount: number;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  venueId: string;
  artistIds: string[];
  imageUrl: string;
  genre: string[];
  ticketPrice?: string;
  averageRating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  userId: string;
  eventId?: string;
  venueId?: string;
  artistId?: string;
  title: string;
  body: string;
  overallRating: number;
  soundRating?: number;
  vibeRating?: number;
  crowdRating?: number;
  valueRating?: number;
  tags: string[];
  helpfulCount: number;
  createdAt: string;
  photos?: string[];
}

export type ReviewTarget = "event" | "venue" | "artist";

export interface Neighborhood {
  name: string;
  borough: string;
  eventCount: number;
}

export type UndergroundPartyStatus = "pending" | "approved" | "expired";

export interface UndergroundParty {
  id: string;
  slug: string;
  title: string;
  description: string;
  submittedByUserId: string;
  date: string;
  startTime: string;
  endTime?: string;
  genre: string[];
  lineup: string[];
  locationVague: boolean;
  /** Shown when locationVague is true — e.g. "East Bushwick" */
  vagueArea?: string;
  /** Optional hint without revealing exact address */
  locationHint?: string;
  /** Shown when locationVague is false */
  address?: string;
  venueName?: string;
  neighborhood?: string;
  borough: string;
  ticketInfo?: string;
  status: UndergroundPartyStatus;
  imageUrl: string;
  createdAt: string;
}
