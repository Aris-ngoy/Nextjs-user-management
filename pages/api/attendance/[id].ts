import { IAttendance } from './../../../models/ICreateUser';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, Attendance } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IResponse } from '../../../models/IResponse'
import { getOneAttendance, onUpdateUserAttendance } from '../../../controller/AttendanceController';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<Attendance | Attendance[]>>) {
    try {
      const { id } = req.query

      if(id === undefined){
        throw new Error("UserId is required")
      }

      if(req.method === 'PUT') {
        let body : IAttendance = {
          id : parseInt(id as string),
          ...req.body,
          clockIn : new Date(req.body.clockIn),
          clockOut : new Date(req.body.clockOut),
        }
        const result = await onUpdateUserAttendance(body)
        res.status(200).json({ data : result })
      }else if(req.method === 'GET') {
        const result = await getOneAttendance(parseInt(id as string))
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
