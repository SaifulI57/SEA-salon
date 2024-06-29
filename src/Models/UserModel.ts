import prisma from '../utils/prismaClient';
import User from '../Schema/UserSchema';
import { Role } from '@prisma/client';

/**
 * Function to create a new user.
 * @param {User} user - The user object containing username, firstName, lastName, email, password, gender, domicile, and role.
 * @returns {Promise<{ success: boolean; user: Omit<User, 'password'> } | false>} A promise that resolves to an object with success status and user details (without password) if successful, false otherwise.
 */
const createUser = async (user: User): Promise<{ success: boolean; user: Omit<User, 'password'> } | false> => {
    try {
        const data: any = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            domicile: user.domicile,
            role: user.role
        };

        const newUser = await prisma.user.create({
            data: data
        });

        const { password, ...withoutpass } = newUser;

        return { success: !!newUser, user: withoutpass };
    } catch (e) {
        console.error('Error creating user', e);
        return false;
    }
};

/**
 * Function to update an existing user.
 * @param {string} id - The ID of the user to update.
 * @param {User} user - The updated user object containing username, firstName, lastName, email, password, gender, domicile, and role.
 * @returns {Promise<{ success: boolean; updated: Omit<User, 'password'> } | false>} A promise that resolves to an object with success status and updated user details (without password) if successful, false otherwise.
 */
const updateUser = async (id: string, user: User): Promise<{ success: boolean; updated: Omit<User, 'password'> } | false> => {
    try {
        let data: any = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            domicile: user.domicile,
            role: user.role
        };

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: data
        });

        const { password, ...withoutpass } = updatedUser;

        return { success: !!updatedUser, updated: withoutpass };
    } catch (e) {
        console.error('Error updating user', e);
        return false;
    }
};

/**
 * Function to get all users with a specific role.
 * @param {Role} role - The role of users to retrieve.
 * @returns {Promise<User[]>} A promise that resolves to an array of users with the specified role.
 */
const getAllUsers = async (role: Role): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany({
            where: { role: role }
        });
        return users;
    } catch (e) {
        console.error('Error retrieving users', e);
        return [];
    }
};

/**
 * Function to get a user by ID and ensure the user's role matches the specified role.
 * @param {string} id - The ID of the user to retrieve.
 * @param {Role} role - The role that the retrieved user must match.
 * @returns {Promise<User | null>} A promise that resolves to the user object if found and matches the specified role, null otherwise.
 */
const getUser = async (id: string, role: Role): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
                reserves: true
            }
        });
        if (user?.role !== role) {
            return null;
        }
        return user;
    } catch (e) {
        console.error('Error retrieving user', e);
        return null;
    }
};

/**
 * Function to get a user by username and ensure the user's role matches the specified role.
 * @param {string} username - The username of the user to retrieve.
 * @param {Role} role - The role that the retrieved user must match.
 * @returns {Promise<User | null>} A promise that resolves to the user object if found and matches the specified role, null otherwise.
 */
const getUsername = async (username: string, role: Role): Promise<User | null> => {
    try {
        const user = await prisma.user.findFirst({
            where: { username: username, role: role }
        });
        return user;
    } catch (e) {
        console.error('Error while retrieving username', e);
        return null;
    }
};

/**
 * Function to check if a user with the given username or email already exists in the specified role.
 * @param {string} username - The username to check.
 * @param {string} email - The email to check.
 * @param {Role} role - The role to check within.
 * @returns {Promise<boolean>} A promise that resolves to true if a user with the given username or email exists in the specified role, false otherwise.
 */
const existingUser = async (username: string, email: string, role: Role): Promise<boolean> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ username: username }, { email: email }],
                role: role
            }
        });
        return !!user;
    } catch (e) {
        console.error('Failed to check existing user', e);
        return false;
    }
};

/**
 * Function to delete a user by ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the user was successfully deleted, false otherwise.
 */
const deleteUser = async (id: string): Promise<boolean> => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: id }
        });
        return !!deletedUser;
    } catch (e) {
        console.error('Error deleting user', e);
        return false;
    }
};

export default {
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,
    existingUser,
    getUsername
};
