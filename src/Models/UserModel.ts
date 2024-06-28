import prisma from '../utils/prismaClient';
import User from '../Schema/UserSchema';
import { Role } from '@prisma/client';

const createUser = async (user: User): Promise<boolean> => {
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
        return !!newUser;
    } catch (e) {
        console.error('Error creating user', e);
        return false;
    }
};

const updateUser = async (id: string, user: User): Promise<boolean> => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                gender: user.gender,
                domicile: user.domicile,
                role: user.role
            }
        });
        return !!updatedUser;
    } catch (e) {
        console.error('Error updating user', e);
        return false;
    }
};

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
