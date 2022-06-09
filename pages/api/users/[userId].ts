// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { onCreateUser, onGetUser, onGetUsers, onUpdateUser } from '../../../controller/userController'
import { IResponse } from '../../../models/IResponse'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<User | User[]>>) {
    try {
      const { userId } = req.query

      if(userId === undefined){
        throw new Error("UserId is required")
      }

      if(req.method === 'PUT') {
        let body = {
          id : parseInt(userId as string),
          ...req.body,
          dob : new Date(req.body.dob)
        }
        const result = await onUpdateUser(body)
        res.status(200).json({ data : result })
      }else if(req.method === 'GET') {
        const result = await onGetUser(parseInt(userId as string))
        if(result){
          res.status(200).json({ data : result })
        }else{
          res.status(404).json({ message : 'User not found...' })
        }
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ error : error.message })
      }else{
        res.status(500).json({ error : 'Opps something went wrong...' + JSON.stringify(error) })
      }
    }
  
}
