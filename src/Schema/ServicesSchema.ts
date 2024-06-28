import { Branch } from '@prisma/client';

export default interface Service {
    name: string;
    price: string;
    duration: number;
    description: string;
    branch?: Branch;
}
