// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Attendance, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {  onExportAttendances } from '../../../controller/AttendanceController'
import { IAttendance } from '../../../models/ICreateUser'
import { IResponse } from '../../../models/IResponse'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<Attendance | Attendance[]>>
) {
  try {
    if (req.method === 'POST') {
      const userId = req.body.userId
      const fromDate = new Date(req.body.fromDate)
      const toDate = new Date(req.body.toDate)
      const data = await onExportAttendances(fromDate, toDate, userId)
      res.status(200).json({ data })
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
