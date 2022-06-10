import { IAttendance } from './../models/ICreateUser';
import { Attendance } from '@prisma/client';
import { prisma } from "../lib/prisma";

export const onCreateAttendance = async (userData : IAttendance): Promise<Attendance> => {
    const user = await prisma.attendance.create({
        data: {
            ...userData
        }
    })
    return user
}

export const onUpdateUserAttendance = async (userData : any): Promise<Attendance> => {

    const user = await prisma.attendance.update({
        where: {
            id: userData.id
        },
        data: {
            ...userData
        }
    })
    return user
}

export const onGetUserAttendancies = async (): Promise<Attendance[]> => {
    const results = await prisma.attendance.findMany({
        include : {
            user : true
        }
    })
    return results
}

export const getOneAttendance = async (id: number): Promise<Attendance | null> => {
    const user = await prisma.attendance.findUnique({
        where: {
            id : id
        },
        include : {
            user : true
        }
    })
    return user
}

export const onExportAttendances = async (fromDate: Date, toDate : Date, userId : number): Promise<Attendance[]> => {
    const results = await prisma.attendance.findMany({
        include : {
            user : true
        },
        where : {
            AND : [
                {
                    createdAt : {
                        gte : fromDate,
                        lte : toDate
                    }
                },
                {
                    user : {
                        id : userId
                    }
                }
            ]
        }
    })
    return results
}