export default interface Review {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    comment?: string | null;
    userId: string;
    reserveId: string;
}
