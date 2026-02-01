export type ITunesTrack = {
  wrapperType: "track";
  kind: "song";

  artistId: number;
  artistName: string;
  artistViewUrl: string;

  collectionId: number;
  collectionName: string;
  collectionCensoredName: string;
  collectionViewUrl: string;
  collectionPrice: number;
  collectionExplicitness: "explicit" | "notExplicit" | "cleaned";

  trackId: number;
  trackName: string;
  trackCensoredName: string;
  trackViewUrl: string;
  trackPrice: number;
  trackExplicitness: "explicit" | "notExplicit" | "cleaned";

  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;

  previewUrl: string;
  isStreamable: boolean;

  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;

  trackTimeMillis: number;
  releaseDate: string; // ISO string

  primaryGenreName: string;

  country: string;
  currency: string;
};

export type SentimentDTOLite = {
  trackId: number;
  isRead: boolean;
  sentiment: string;
   createdAt: Date | string;
   for: string;
   _id: string;
};

export interface SentimentDTO  extends SentimentDTOLite {
  track: ITunesTrack;
};



export type SentimentForm = {
  trackId: number;
  sentiment: string;
}

export type GetMySentimentsResponse = {
  success: boolean;
  hasUnreadSentiments: boolean;
  nextPage: number | null;
  sentiments: SentimentDTOLite[],
  totalSentiments: number;
}

export type GetASingleSentimentResponse = {
 success: boolean;
 sentiment: SentimentDTO;
}