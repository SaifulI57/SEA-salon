import { Context } from 'hono';
import ServiceM from '../Models/ServiceModel';
import Service from '../Schema/ServicesSchema';

interface ServiceRequest extends Omit<Service, 'branch'> {
    branchId?: string;
    id?: string;
}

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

        const createSer = await ServiceM.createService(branchId!, serviceData);

        return createSer ? c.json({ message: 'Successfully created Service' }, 201) : c.json({ message: 'Failed to create Service' }, 500);
    } catch (e) {
        console.error('Error creating Service:', e);
        return c.json({ error: 'Error creating Service' }, 500);
    }
};

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
