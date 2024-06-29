import { PrismaClient, Service as PrismaService } from '@prisma/client';
import Service from '../Schema/ServicesSchema';
import prisma from '../utils/prismaClient';

/**
 * Creates a new service in the database.
 * @param {string} branchId - The ID of the branch to associate the service with.
 * @param {Service} service - The service data object containing details of the service.
 * @returns {Promise<boolean>} A promise that resolves to true if service creation was successful, false otherwise.
 */
const createService = async (branchId: string, service: Service): Promise<boolean> => {
    try {
        const data: any = {
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
        };

        if (service.branch) {
            data.branch = {
                connect: { id: branchId }
            };
        }

        const createS = await prisma.service.create({
            data: data
        });

        return !!createS;
    } catch (e) {
        console.error('Error creating service', e);
        return false;
    }
};

/**
 * Updates an existing service in the database.
 * @param {string} id - The ID of the service to update.
 * @param {string} branchId - The ID of the branch to associate the service with.
 * @param {Service} service - The service data object containing updated details of the service.
 * @returns {Promise<boolean>} A promise that resolves to true if service update was successful, false otherwise.
 */
const updateService = async (id: string, branchId: string, service: Service): Promise<boolean> => {
    try {
        const data: any = {
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
        };

        if (branchId) {
            data.branch = {
                connect: { id: branchId }
            };
        }

        const updateS = await prisma.service.update({
            where: { id: id },
            data: data
        });

        return !!updateS;
    } catch (e) {
        console.error('Error updating service', e);
        return false;
    }
};

/**
 * Retrieves a service by its name from the database.
 * @param {string} name - The name of the service to retrieve.
 * @returns {Promise<PrismaService | null>} A promise that resolves to the service object if found, or null otherwise.
 */
const getService = async (name: string): Promise<PrismaService | null> => {
    try {
        const getS = await prisma.service.findUnique({
            where: {
                name: name
            },
            include: {
                branch: true
            }
        });
        console.log(getS);
        return getS;
    } catch (e) {
        console.error('Error getting service', e);
        return null;
    }
};

/**
 * Retrieves all services from the database.
 * @returns {Promise<PrismaService[] | null>} A promise that resolves to an array of service objects, or null if an error occurs.
 */
const getAllService = async (): Promise<PrismaService[] | null> => {
    try {
        const getAll = await prisma.service.findMany({
            include: {
                branch: true
            }
        });

        return getAll;
    } catch (e) {
        console.error('Error getting all services', e);
        return null;
    }
};

/**
 * Checks if a service with the given name or description already exists in the database.
 * @param {string} name - The name of the service to check.
 * @param {string} description - The description of the service to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the service exists, false otherwise.
 */
const existingService = async (name: string, description: string): Promise<boolean> => {
    try {
        const getEx = await prisma.service.findFirst({
            where: {
                OR: [{ name: name }, { description: description }]
            }
        });

        return !!getEx;
    } catch (e) {
        console.error('Error getting existing service', e);
        return false;
    }
};

/**
 * Deletes a service from the database by its ID.
 * @param {string} id - The ID of the service to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful, false otherwise.
 */
const deleteService = async (id: string): Promise<boolean> => {
    try {
        const delSer = await prisma.service.delete({
            where: { id: id }
        });

        return !!delSer;
    } catch (e) {
        console.error('Error deleting service', e);
        return false;
    }
};

export default {
    createService,
    updateService,
    getService,
    getAllService,
    deleteService,
    existingService
};
