// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Attendance, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { onCreateAttendance, onGetUserAttendancies } from '../../../controller/AttendanceController'
import { IAttendance } from '../../../models/ICreateUser'
import { IResponse } from '../../../models/IResponse'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<Attendance | Attendance[]>>
) {
  try {
    if (req.method === 'POST') {
      const body : IAttendance = {
        ...req.body,
        clockIn : new Date(req.body.clockIn),
      }
      const data = await onCreateAttendance(body)
      res.status(200).json({ data })
      
    }else if(req.method === 'GET'){
      const attendancies = await onGetUserAttendancies()
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
