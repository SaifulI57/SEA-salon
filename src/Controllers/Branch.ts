import { Context } from 'hono';
import Branch from '../Schema/BranchSchema';
import BranchM from '../Models/BranchModel';

/**
 * Creates a new branch.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the branch creation process is complete.
 */
const createBranch = async (c: Context) => {
    try {
        const { name, address, contact_phone, contact_email, services, reserves } = await c.req.json();

        if (!name || !address || !contact_phone || !contact_email) {
            return c.json({ error: 'Missing required fields' }, 400);
        }

        if (await BranchM.existingBranch(name, address)) {
            return c.json({ error: 'Branch with the same name or address already exists' }, 409);
        }

        const data: Branch = {
            name,
            address,
            contact_phone,
            contact_email,
            services: services || [],
            reserves: reserves || []
        };

        const created = await BranchM.createBranch(data);

        return created ? c.json({ message: 'Successfully created' }) : c.json({ error: 'Failed to create branch' }, 500);
    } catch (e) {
        console.error('Error creating branch:', e);
        return c.json({ error: 'Error creating branch' }, 500);
    }
};

/**
 * Retrieves a branch by its name.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the branch retrieval process is complete.
 */
const getBranchByName = async (c: Context) => {
    try {
        const name = await c.req.query('name');

        if (!name) {
            return c.json({ error: 'Name is required' }, 400);
        }

        const branch = await BranchM.getBranchByName(name);

        return branch ? c.json({ data: branch }) : c.json({ error: 'Branch not found' }, 404);
    } catch (e) {
        console.error('Error getting branch:', e);
        return c.json({ error: 'Failed to retrieve branch' }, 500);
    }
};

/**
 * Updates a branch.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the branch update process is complete.
 */
const updateBranch = async (c: Context) => {
    try {
        const { id, name, address, contact_phone, contact_email, services, reserves } = await c.req.json();

        if (!id) {
            return c.json({ error: 'ID is required' }, 400);
        }

        const data: Branch = {
            name,
            address,
            contact_phone,
            contact_email,
            services: services || [],
            reserves: reserves || []
        };

        const updated = await BranchM.updateBranch(id, data);

        return updated ? c.json({ message: 'Successfully updated the branch' }) : c.json({ error: 'Failed to update the branch' }, 500);
    } catch (e) {
        console.error('Error updating branch:', e);
        return c.json({ error: 'Error updating the branch' }, 500);
    }
};

/**
 * Retrieves all branches.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the branch retrieval process is complete.
 */
const getAllBranch = async (c: Context) => {
    try {
        let all = await BranchM.getAllBranches();

        return c.json({ data: all });
    } catch (e) {
        console.error('Error getting all branches', e);
        return c.json({ error: 'Error getting all branches' });
    }
};

/**
 * Deletes a branch.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the branch deletion process is complete.
 */
const deleteBranch = async (c: Context) => {
    try {
        const { id } = await c.req.json();

        if (!id) {
            return c.json({ error: 'ID is required' }, 400);
        }

        const deleted = await BranchM.deleteBranch(id);

        return deleted ? c.json({ message: 'Successfully deleted the branch' }) : c.json({ error: 'Failed to delete the branch' }, 500);
    } catch (e) {
        console.error('Error deleting branch:', e);
        return c.json({ error: 'Error deleting the branch' }, 500);
    }
};

export default {
    createBranch,
    updateBranch,
    getBranchByName,
    deleteBranch,
    getAllBranch
};
