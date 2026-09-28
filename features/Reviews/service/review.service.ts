import { apiFetch } from "@/lib/api/apiFetch";
import { CreateReviewBody, CreateReviewResponse, RoomReviewsResponse } from "../types/types";

export async function addReview(data:CreateReviewBody) {
    return apiFetch<CreateReviewResponse>('/portal/room-reviews',{
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function getReview(roomId: string) {
    return apiFetch<RoomReviewsResponse>(`/portal/room-reviews/${roomId}`);
}