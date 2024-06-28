import { PrismaClient, Branch as PrismaBranch } from '@prisma/client';
import Branch from '../Schema/BranchSchema';

const prisma = new PrismaClient();

/**
 * Creates a new branch in the database.
 * @param {Branch} branchData - The branch data object containing details of the branch.
 * @returns {Promise<boolean>} A promise that resolves to true if branch creation was successful, false otherwise.
 */
const createBranch = async (branchData: Branch): Promise<boolean> => {
    try {
        const data: any = {
            name: branchData.name,
            address: branchData.address,
            contactPhone: branchData.contact_phone,
            contactEmail: branchData.contact_email
        };

        if (branchData.services) {
            data.services = {
                connect: branchData.services.map((service) => ({ id: service.id }))
            };
        }

        if (branchData.reserves) {
            data.reserves = {
                connect: branchData.reserves.map((reserve) => ({ id: reserve.id }))
            };
        }

        const createdBranch = await prisma.branch.create({
            data
        });
        return !!createdBranch;
    } catch (error) {
        console.error('Error creating branch:', error);
        return false;
    }
};

/**
 * Updates a branch in the database by its ID.
 * @param {string} id - The ID of the branch to update.
 * @param {Branch} branchData - The branch data object containing updated details of the branch.
 * @returns {Promise<boolean>} A promise that resolves to true if branch update was successful, false otherwise.
 */
const updateBranch = async (id: string, branchData: Branch): Promise<boolean> => {
    try {
        const data: any = {
            name: branchData.name,
            address: branchData.address,
            contactPhone: branchData.contact_phone,
            contactEmail: branchData.contact_email
        };

        if (branchData.services) {
            data.services = {
                connect: branchData.services.map((service) => ({ id: service.id }))
            };
        }

        if (branchData.reserves) {
            data.reserves = {
                connect: branchData.reserves.map((reserve) => ({ id: reserve.id }))
            };
        }

        const updatedBranch = await prisma.branch.update({
            where: { id },
            data
        });

        return !!updatedBranch;
    } catch (error) {
        console.error('Error updating branch:', error);
        return false;
    }
};

/**
 * Deletes a branch from the database by its ID.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful, false otherwise.
 */
const deleteBranch = async (id: string): Promise<boolean> => {
    try {
        const deletedBranch = await prisma.branch.delete({
            where: { id }
        });
        return !!deletedBranch;
    } catch (error) {
        console.error('Error deleting branch:', error);
        return false;
    }
};

/**
 * Retrieves all branches from the database.
 * @returns {Promise<PrismaBranch[]>} A promise that resolves to an array of branch objects.
 */
const getAllBranches = async (): Promise<PrismaBranch[]> => {
    try {
        const branches = await prisma.branch.findMany({
            include: {
                services: true,
                reserves: true
            }
        });
        return branches;
    } catch (error) {
        console.error('Error fetching branches:', error);
        throw new Error('Error fetching branches');
    }
};

/**
 * Checks if a branch with the given name or address already exists.
 * @param {string} name - The name of the branch.
 * @param {string} address - The address of the branch.
 * @returns {Promise<boolean>} A promise that resolves to true if the branch exists, false otherwise.
 */
const existingBranch = async (name: string, address: string): Promise<boolean> => {
    try {
        const branch = await prisma.branch.findFirst({
            where: {
                OR: [{ name }, { address }]
            }
        });
        return !!branch;
    } catch (error) {
        console.error('Failed to find branch:', error);
        return false;
    }
};

/**
 * Retrieves a branch by its name.
 * @param {string} name - The name of the branch.
 * @returns {Promise<PrismaBranch | null>} A promise that resolves to the branch object if found, null otherwise.
 */
const getBranchByName = async (name: string): Promise<PrismaBranch | null> => {
    try {
        const branch = await prisma.branch.findUnique({
            where: { name }
        });
        return branch;
    } catch (error) {
        console.error('Failed to find branch by name:', error);
        return null;
    }
};

export default {
    createBranch,
    updateBranch,
    getAllBranches,
    deleteBranch,
    getBranchByName,
    existingBranch
};
