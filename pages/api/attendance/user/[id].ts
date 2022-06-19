// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Attendance, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { geUserattendance } from '../../../../controller/AttendanceController'
import { IResponse } from '../../../../models/IResponse'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<Attendance[]>>
) {
  try {
    if(req.method === 'GET'){
      const id = req.query.id as string
      const attendancies = await geUserattendance(parseInt(id))
      res.status(200).json({ data : attendancies })
    }else{
      res.status(405).json({ message : 'Method not allowed...' })
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error : error.message })
    }else{
      res.status(500).json({ error : 'Opps something went wrong...' + JSON.stringify(error) })
    }
  }
}
