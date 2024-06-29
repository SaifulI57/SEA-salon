import { PrismaClient, Reserve as PrismaReserve, Review } from '@prisma/client';
import Reserve from '../Schema/ReserveSchema';

const prisma = new PrismaClient();

/**
 * Creates a new reserve in the database.
 * @param {Partial<PrismaReserve>} reserveData - The reserve data object containing details of the reserve.
 * @returns {Promise<boolean>} A promise that resolves to true if reserve creation was successful, false otherwise.
 */
const createReserve = async (branchId: string, userId: string, serviceId: string, reserveData: Reserve): Promise<boolean> => {
    try {
        let data: any = {
            id: reserveData.id,
            duration: reserveData.duration,
            createdAt: reserveData.createdAt,
            updatedAt: reserveData.updatedAt
        };

        if (branchId) {
            data.branch = {
                connect: { id: branchId }
            };
        }
        if (userId) {
            data.branch = {
                connect: { id: userId }
            };
        }
        if (serviceId) {
            data.branch = {
                connect: { id: serviceId }
            };
        }
        const createdReserve = await prisma.reserve.create({
            data: data
        });
        return !!createdReserve;
    } catch (error) {
        console.error('Error creating reserve:', error);
        return false;
    }
};

/**
 * Updates a reserve in the database by its ID.
 * @param {string} id - The ID of the reserve to update.
 * @param {Partial<PrismaReserve>} reserveData - The reserve data object containing updated details of the reserve.
 * @returns {Promise<boolean>} A promise that resolves to true if reserve update was successful, false otherwise.
 */
const updateReserve = async (review: Review, branchId: string, userId: string, serviceId: string, id: string, reserveData: Reserve): Promise<boolean> => {
    try {
        let data: any = {
            id: reserveData.id,
            duration: reserveData.duration,
            createdAt: reserveData.createdAt,
            updatedAt: reserveData.updatedAt
        };

        if (branchId) {
            data.branch = {
                connect: { id: branchId }
            };
        }
        if (userId) {
            data.branch = {
                connect: { id: userId }
            };
        }
        if (serviceId) {
            data.branch = {
                connect: { id: serviceId }
            };
        }
        if (review) {
            data.review = review;
        }
        const updatedReserve = await prisma.reserve.update({
            where: { id: id },
            data: data
        });
        return !!updatedReserve;
    } catch (error) {
        console.error('Error updating reserve:', error);
        return false;
    }
};

/**
 * Deletes a reserve from the database by its ID.
 * @param {string} id - The ID of the reserve to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful, false otherwise.
 */
const deleteReserve = async (id: string): Promise<boolean> => {
    try {
        const deletedReserve = await prisma.reserve.delete({
            where: { id: id }
        });
        return !!deletedReserve;
    } catch (error) {
        console.error('Error deleting reserve:', error);
        return false;
    }
};

const getReserve = async (name: string): Promise<PrismaReserve | null> => {
    try {
        const getR = await prisma.reserve.findUnique({
            where: {
                name: name
            }
        });

        return getR;
    } catch (e) {
        console.error('Failed to retrieve reservation', e);
        return null;
    }
};

/**
 * Retrieves all reserves from the database.
 * @returns {Promise<PrismaReserve[]>} A promise that resolves to an array of reserve objects.
 */
const getAllReserves = async (): Promise<PrismaReserve[]> => {
    try {
        const reserves = await prisma.reserve.findMany();
        return reserves;
    } catch (error) {
        console.error('Error fetching reserves:', error);
        throw new Error('Error fetching reserves');
    }
};

export default {
    createReserve,
    updateReserve,
    deleteReserve,
    getAllReserves,
    getReserve
};
