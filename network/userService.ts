import { User } from "@prisma/client";
import { ICreateUser } from "../models/ICreateUser";

export const onCreateUser = async <T>(user: ICreateUser): Promise<T> => {
    const result = await fetch(`/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    return result.json(); 
}

export const onGetUser = async <T>(id : number): Promise<T> => {
    const result = await fetch(`/api/users/${id}`)
    return result.json(); 
}

export const onUpdateUser = async <T>(id : number, user: ICreateUser): Promise<T> => {
    const result = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    return result.json(); 
}