// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { onCreateUser, onGetUsers } from '../../../controller/userController'
import { IResponse } from '../../../models/IResponse'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<User | User[]>>) {
    try {
      if(req.method === 'POST') {
        
        let body = {
          ...req.body,
          dob : new Date(req.body.dob)
        }
        const result = await onCreateUser(body)
        res.status(200).json({ data : result })
      }else if(req.method === 'GET') {
        const result = await onGetUsers()
        res.status(200).json({ data : result })
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ error : error.message })
      }else{
        res.status(500).json({ error : 'Opps something went wrong...' + JSON.stringify(error) })
      }
    }
  
}
