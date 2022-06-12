// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { signUpUser } from '../../../controller/authController';
import { IAuth } from '../../../models/IAth';
import { IResponse } from '../../../models/IResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<IAuth>>
) {
    if(req.method === 'POST') {
        try {
            const { userId, password } = req.body;
            const auth = await signUpUser(userId, password);
            return res.status(200).json({ data : auth })
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({ error : error.message })
              }else{
                res.status(500).json({ error : 'Opps something went wrong...' + JSON.stringify(error) })
              }
        }
    }else{
        res.status(400).json({ error : 'Invalid request' })
    }
}
