import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { signInUser } from '../../../controller/authController';
import { IResponse } from '../../../models/IResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<User>>
) {
    if(req.method === 'POST') {
        try {
            const { email, password } = req.body;
            const auth = await signInUser(email, password);
            if(auth) {
                return res.status(200).json({ data : auth })
            }else{
                return res.status(400).json({ error : 'Invalid credentials' })
            }
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
