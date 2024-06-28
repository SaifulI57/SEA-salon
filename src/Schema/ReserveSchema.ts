import { User, Branch, Service } from "@prisma/client";

export default interface Reserve {
    id: string;
    name: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    startTime: Date;
    endTime: Date;
    customer: User;
    branch: Branch;
    service: Service;
}
