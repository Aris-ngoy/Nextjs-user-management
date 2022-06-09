import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ICreateUser } from "../models/ICreateUser";

export const onCreateUser = async (userData : ICreateUser): Promise<User> => {
    const user = await prisma.user.create({
        data: {
            ...userData
        }
    })
    return user
}

export const onUpdateUser = async (userData : ICreateUser): Promise<User> => {
    const user = await prisma.user.update({
        where: {
            id: userData.id
        },
        data: {
            ...userData
        }
    })
    return user
}

export const onGetUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany()
    return users
}

export const onGetUser = async (id: number): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id : id
        },
        include: {
            attendance : true
        }
    })
    return user
}
