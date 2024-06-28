export interface Review {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    comment?: string;
    userId: string;
    reserveId: string;
}