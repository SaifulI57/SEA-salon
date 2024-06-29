import prisma from '../utils/prismaClient';
import Review from '../Schema/ReviewSchema';

/**
 * Function to create a new review.
 * @param {Review} review - The review object containing rating, comment, userId, and optional reserveId.
 * @returns {Promise<boolean>} A promise that resolves to true if the review was successfully created, false otherwise.
 */
const createReview = async (review: Review): Promise<boolean> => {
    try {
        const data: any = {
            rating: review.rating,
            comment: review.comment,
            user: {
                connect: { id: review.userId }
            }
        };

        if (review.reserveId) {
            data.reserve = {
                connect: { id: review.reserveId }
            };
        }

        const newReview = await prisma.review.create({
            data: data
        });
        return !!newReview;
    } catch (e) {
        console.error('Error creating review', e);
        return false;
    }
};

/**
 * Function to update an existing review.
 * @param {string} id - The ID of the review to update.
 * @param {Review} review - The updated review object containing rating, comment, userId, and optional reserveId.
 * @returns {Promise<boolean>} A promise that resolves to true if the review was successfully updated, false otherwise.
 */
const updateReview = async (id: string, review: Review): Promise<boolean> => {
    try {
        let data: any = {
            rating: review.rating,
            comment: review.comment,
            user: {
                connect: { id: review.userId }
            }
        };
        if (review.reserveId) {
            data.reserve = {
                connect: { id: review.reserveId }
            };
        }
        const updatedReview = await prisma.review.update({
            where: { id: id },
            data: data
        });

        return !!updatedReview;
    } catch (e) {
        console.error('Error updating review', e);
        return false;
    }
};

/**
 * Function to get a review by its ID.
 * @param {string} id - The ID of the review to retrieve.
 * @returns {Promise<Review | null>} A promise that resolves to the review object if found, null otherwise.
 */
const getReview = async (id: string): Promise<Review | null> => {
    try {
        const review: any = await prisma.review.findUnique({
            where: { id: id },
            include: {
                user: true,
                reserve: true
            }
        });
        return review;
    } catch (e) {
        console.error('Error retrieving review', e);
        return null;
    }
};

/**
 * Function to get all reviews.
 * @returns {Promise<Review[] | null>} A promise that resolves to an array of reviews if successful, null otherwise.
 */
const getAllReviews = async (): Promise<Review[] | null> => {
    try {
        const reviews: any = await prisma.review.findMany({
            include: {
                user: true,
                reserve: true
            }
        });
        return reviews;
    } catch (e) {
        console.error('Error retrieving reviews', e);
        return null;
    }
};

/**
 * Function to delete a review by its ID.
 * @param {string} id - The ID of the review to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the review was successfully deleted, false otherwise.
 */
const deleteReview = async (id: string): Promise<boolean> => {
    try {
        const deletedReview = await prisma.review.delete({
            where: { id: id }
        });
        return !!deletedReview;
    } catch (e) {
        console.error('Error deleting review', e);
        return false;
    }
};

export default {
    createReview,
    updateReview,
    getReview,
    getAllReviews,
    deleteReview
};
