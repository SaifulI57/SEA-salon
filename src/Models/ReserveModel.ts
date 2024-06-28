import { PrismaClient, Reserve as PrismaReserve } from '@prisma/client';
import Reserve from '../Schema/ReserveSchema';


const prisma = new PrismaClient();

/**
 * Creates a new reserve in the database.
 * @param {Partial<PrismaReserve>} reserveData - The reserve data object containing details of the reserve.
 * @returns {Promise<boolean>} A promise that resolves to true if reserve creation was successful, false otherwise.
 */
export const createReserve = async (reserveData: Reserve): Promise<boolean> => {
    try {
        const createdReserve = await prisma.reserve.create({
            data: {
                id: reserveData.id,
                duration: reserveData.duration,
                createdAt: reserveData.createdAt,
                updatedAt: reserveData.updatedAt,
                userId: reserveData.customer.id,
                branchId: reserveData.branch.id,
            }
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
export const updateReserve = async (id: string, reserveData: Reserve): Promise<boolean> => {
    try {
        const updatedReserve = await prisma.reserve.update({
            where: { id: id },
            data: {
                id: reserveData.id,
                duration: reserveData.duration,
                createdAt: reserveData.createdAt,
                updatedAt: reserveData.updatedAt,
                userId: reserveData.customer.id,
                branchId: reserveData.branch.id,
            }
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
export const deleteReserve = async (id: string): Promise<boolean> => {
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

/**
 * Retrieves all reserves from the database.
 * @returns {Promise<PrismaReserve[]>} A promise that resolves to an array of reserve objects.
 */
export const getAllReserves = async (): Promise<PrismaReserve[]> => {
    try {
        const reserves = await prisma.reserve.findMany();
        return reserves;
    } catch (error) {
        console.error('Error fetching reserves:', error);
        throw new Error('Error fetching reserves');
    }
};
