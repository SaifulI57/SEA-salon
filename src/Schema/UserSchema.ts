import { Role } from '@prisma/client';

export default interface User {
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    password: string;
    email: string;
    gender?: string | null;
    domicile?: string | null;
    role: Role;
}
