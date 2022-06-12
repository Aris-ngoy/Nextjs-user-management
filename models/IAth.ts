import { Authentication, User } from "@prisma/client";

export interface IAuth extends Authentication {
    user ? : User
}

export interface IAthResponse {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    phone:      string;
    dob:        Date;
    role:       string;
    createdAt:  Date;
    updateAt:   Date;
    auth:       Auth;
}

export interface Auth {
    id:       number;
    password: string;
    userId:   number;
}