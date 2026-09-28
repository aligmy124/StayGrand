// Request body for creating a review
export interface CreateReviewBody {
  roomId: string;
  rating: number;
  review: string;
}

// Review object returned when creating a review (IDs only)
export interface CreatedRoomReview {
  room: string;
  user: string;
  rating: number;
  review: string;
  _id: string;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
}

// Response after creating a review
export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: {
    roomReview: CreatedRoomReview;
  };
}

// Room summary object
export interface RoomSummary {
  _id: string;
  roomNumber: string;
}

// User summary object
export interface UserSummary {
  _id: string;
  userName: string;
  profileImage: string;
}

// Review object returned when fetching reviews (with nested room & user)
export interface PopulatedRoomReview {
  _id: string;
  room: RoomSummary;
  user: UserSummary;
  rating: number;
  review: string;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
}

// Root response when fetching multiple reviews
export interface RoomReviewsResponse {
  success: boolean;
  message: string;
  data: {
    roomReviews: PopulatedRoomReview[];
    totalCount: number;
  };
}
