import { PrismaClient, Service as PrismaService } from '@prisma/client';
import Service from '../Schema/ServicesSchema';
import prisma from '../utils/prismaClient';

// Function to create a new service
const createService = async (branchId: string, service: Service): Promise<boolean> => {
    try {
        // Prepare data for the new service
        const data: any = {
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
        };

        // Connect to an existing branch by ID if provided
        if (service.branch) {
            data.branch = {
                connect: { id: branchId }
            };
        }

        // Create the service in the database
        const createS = await prisma.service.create({
            data: data
        });

        return !!createS; // Return true if the creation was successful
    } catch (e) {
        console.error('Error creating service', e);
        return false; // Return false if there was an error
    }
};

// Function to update an existing service
const updateService = async (id: string, branchId: string, service: Service): Promise<boolean> => {
    try {
        // Prepare data for the updated service
        const data: any = {
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
        };

        // Connect to an existing branch by ID if provided
        if (service.branch) {
            data.branch = {
                connect: { id: branchId }
            };
        }

        // Update the service in the database
        const updateS = await prisma.service.update({
            where: { id: id },
            data: data
        });

        return !!updateS; // Return true if the update was successful
    } catch (e) {
        console.error('Error updating service', e);
        return false; // Return false if there was an error
    }
};

// Function to get a service by its name
const getService = async (name: string): Promise<PrismaService | null> => {
    try {
        const getS = await prisma.service.findUnique({
            where: {
                name: name
            }
        });

        return getS; // Return the service if found
    } catch (e) {
        console.error('Error getting service', e);
        return null; // Return null if there was an error
    }
};

// Function to get all services
const getAllService = async (): Promise<PrismaService[] | null> => {
    try {
        const getAll = await prisma.service.findMany({
            include: {
                Branch: true
            }
        });

        return getAll; // Return the list of services
    } catch (e) {
        console.error('Error getting all services', e);
        return null; // Return null if there was an error
    }
};

// Function to check if a service with the same name or description exists
const existingService = async (name: string, description: string): Promise<boolean> => {
    try {
        const getEx = await prisma.service.findFirst({
            where: {
                OR: [{ name: name }, { description: description }]
            }
        });

        return !!getEx; // Return true if the service exists
    } catch (e) {
        console.error('Error getting existing service');
        return false; // Return false if there was an error
    }
};

// Function to delete a service by its ID
const deleteService = async (id: string): Promise<boolean> => {
    try {
        const delSer = await prisma.service.delete({
            where: { id: id }
        });

        return !!delSer; // Return true if the deletion was successful
    } catch (e) {
        console.error('Error deleting service', e);
        return false; // Return false if there was an error
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
