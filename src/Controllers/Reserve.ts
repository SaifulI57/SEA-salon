import { Context } from 'hono';
import ReserveM from '../Models/ReserveModel';

/**
 * Creates a new reservation.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the reservation creation process is complete.
 */
const createReserve = async (c: Context) => {
    try {
        const { branchId, userId, serviceId, duration, createdAt, updatedAt } = await c.req.json();

        if (!branchId || !userId || !serviceId || !duration) {
            return c.json({ error: 'Missing required fields' }, 400);
        }

        const data: any = {
            duration,
            createdAt: createdAt || new Date(),
            updatedAt: updatedAt || new Date()
        };

        const created = await ReserveM.createReserve(branchId, userId, serviceId, data);

        return created ? c.json({ message: 'Successfully created' }) : c.json({ error: 'Failed to create reserve' }, 500);
    } catch (e) {
        console.error('Error creating reserve:', e);
        return c.json({ error: 'Error creating reserve' }, 500);
    }
};

/**
 * Retrieves a reservation by its ID.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the reservation retrieval process is complete.
 */
const getReserve = async (c: Context) => {
    try {
        const id = c.req.query('id');

        if (!id) {
            return c.json({ error: 'ID is required' }, 400);
        }

        const reserve = await ReserveM.getReserve(id);

        return reserve ? c.json({ data: reserve }) : c.json({ error: 'Reserve not found' }, 404);
    } catch (e) {
        console.error('Error getting reserve:', e);
        return c.json({ error: 'Failed to retrieve reserve' }, 500);
    }
};

/**
 * Updates a reservation.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the reservation update process is complete.
 */
const updateReserve = async (c: Context) => {
    try {
        const { id, branchId, userId, serviceId, duration, createdAt, updatedAt, review } = await c.req.json();

        if (!id) {
            return c.json({ error: 'ID is required' }, 400);
        }

        const data: any = {
            duration,
            createdAt: createdAt || new Date(),
            updatedAt: updatedAt || new Date()
        };

        const updated = await ReserveM.updateReserve(review, branchId, userId, serviceId, id, data);

        return updated ? c.json({ message: 'Successfully updated the reserve' }) : c.json({ error: 'Failed to update the reserve' }, 500);
    } catch (e) {
        console.error('Error updating reserve:', e);
        return c.json({ error: 'Error updating the reserve' }, 500);
    }
};

/**
 * Retrieves all reservations.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the reservation retrieval process is complete.
 */
const getAllReserves = async (c: Context) => {
    try {
        const all = await ReserveM.getAllReserves();

        return c.json({ data: all });
    } catch (e) {
        console.error('Error getting all reserves', e);
        return c.json({ error: 'Error getting all reserves' });
    }
};

/**
 * Deletes a reservation.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<void>} A promise that resolves when the reservation deletion process is complete.
 */
const deleteReserve = async (c: Context) => {
    try {
        const { id } = await c.req.json();

        if (!id) {
            return c.json({ error: 'ID is required' }, 400);
        }

        const deleted = await ReserveM.deleteReserve(id);

        return deleted ? c.json({ message: 'Successfully deleted the reserve' }) : c.json({ error: 'Failed to delete the reserve' }, 500);
    } catch (e) {
        console.error('Error deleting reserve:', e);
        return c.json({ error: 'Error deleting the reserve' }, 500);
    }
};

export default {
    createReserve,
    updateReserve,
    getReserve,
    deleteReserve,
    getAllReserves
};
