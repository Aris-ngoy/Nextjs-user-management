import { Role } from "@prisma/client";

export interface ICreateUser {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    dob?: Date;
    role?: Role;
}

export interface IAttendance{
    id?: number;
    userId: number;
    clockIn: Date;
    clockOut?: Date | null;
    alcoholLevel: number;
    temperature: number;
}