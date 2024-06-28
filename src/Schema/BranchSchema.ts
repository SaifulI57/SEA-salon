import { Reserve , Service, User } from '@prisma/client'

export default interface Branch {
    name: string;
    address: string;
    contact_phone: string;
    contact_email: string;
    services?: Service[]
    reserves?: Reserve[]
    users?: User[]
}
