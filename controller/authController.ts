import { Authentication, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma'


export const signUpUser = async (userId : number, password : string) : Promise<Authentication>=> {
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashPassword = await bcrypt.hash(password, salt);

    const auth = await prisma.authentication.create({
        data: {
           userId: userId,
           password: hashPassword 
        }
    })

    return auth;
}

export const signInUser = async (email : string, password : string) : Promise<User | null> => {
    const user = await prisma.user.findFirst({ 
        where : { email : email },
        include : { auth : true },
        take: 1 
    })
    if(user) {
        const isMatch = await bcrypt.compare(password, user.auth?.password!!);
        if(isMatch) {
            return user
        }else{
            return null
        }
    }else{
        return null
    }
}