import { Context } from 'hono';
import ServiceM from '../Models/ServiceModel';
import Service from '../Schema/ServicesSchema';

interface ServiceRequest extends Omit<Service, 'branch'> {
    branchId?: string;
    id?: string;
}

/**
 * Creates a new service.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the service creation process is complete.
 */
const createServices = async (c: Context) => {
    try {
        const { name, description, price, duration, branchId }: ServiceRequest = await c.req.json();

        if (await ServiceM.existingService(name, description)) {
            return c.json({ error: 'Name or description already exists' }, 400);
        }

        const serviceData: Omit<Service, 'branch'> & { branchId?: string } = {
            name,
            description,
            price,
            duration
        };
        console.log(branchId);
        const createSer = await ServiceM.createService(branchId!, serviceData);

        return createSer ? c.json({ message: 'Successfully created Service' }, 201) : c.json({ message: 'Failed to create Service' }, 500);
    } catch (e) {
        console.error('Error creating Service:', e);
        return c.json({ error: 'Error creating Service' }, 500);
    }
};

/**
 * Updates an existing service.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the service update process is complete.
 */
const updateServices = async (c: Context) => {
    try {
        const { id, name, description, price, duration, branchId }: ServiceRequest = await c.req.json();

        if (!id) {
            return c.json({ error: 'Service ID is required' }, 400);
        }

        if (await ServiceM.existingService(name, description)) {
            return c.json({ error: 'Name or description already exists' }, 400);
        }

        const serviceData: Omit<Service, 'branch'> = {
            name,
            description,
            price,
            duration
        };

        const updateSer = await ServiceM.updateService(id, branchId!, serviceData);

        return updateSer ? c.json({ message: 'Successfully updated Service' }, 200) : c.json({ message: 'Failed to update Service' }, 500);
    } catch (e) {
        console.error('Error updating Service:', e);
        return c.json({ error: 'Error updating Service' }, 500);
    }
};

/**
 * Retrieves a service by its name.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the service retrieval process is complete.
 */
const getServicesName = async (c: Context) => {
    try {
        let name = c.req.query('name')!;
        name = name.replaceAll('"', '');
        const service = await ServiceM.getService(name);
        return service ? c.json({ message: 'Success', data: service }, 200) : c.json({ message: 'Failed to get Service' }, 404);
    } catch (e) {
        console.error('Error getting Service:', e);
        return c.json({ error: 'Error getting Service' }, 500);
    }
};

/**
 * Deletes an existing service.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the service deletion process is complete.
 */
const deleteServices = async (c: Context) => {
    try {
        const { id }: { id: string } = await c.req.json();

        if (!id) {
            return c.json({ error: 'Service ID is required' }, 400);
        }

        const deleteSer = await ServiceM.deleteService(id);

        return deleteSer ? c.json({ message: 'Successfully deleted Service' }, 200) : c.json({ message: 'Failed to delete Service' }, 500);
    } catch (e) {
        console.error('Error deleting Service:', e);
        return c.json({ error: 'Error deleting Service' }, 500);
    }
};

export default {
    createServices,
    updateServices,
    getServicesName,
    deleteServices
};
