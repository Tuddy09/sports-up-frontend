export interface PlayerRating {
  toUserId?: string; // For ratings given
  fromUserId?: string; // For ratings received
  rating: number;
  comment: string;
}
