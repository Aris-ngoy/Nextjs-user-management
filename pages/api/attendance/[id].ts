import { prisma } from './../../../lib/prisma';
import { IAttendance } from './../../../models/ICreateUser';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Attendance, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IResponse } from '../../../models/IResponse'
import { getOneAttendance, onUpdateUserAttendance } from '../../../controller/AttendanceController';

const removeTime = (dateTime : Date)=> {
  return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<Attendance | Attendance[]>>) {
    try {
      const { id } = req.query

      if(id === undefined){
        throw new Error("UserId is required")
      }
      
      if(req.method === 'POST' || req.method === 'PUT') {
        
        const  currentLogin = await prisma.attendance.findFirst({
          where: {
            userId: parseInt(req.body.userId as string),
            AND : [
              {
                clockOut : {
                  equals : null
                }
              }
            ]
          },
          orderBy:{
            createdAt: 'desc'
          },
          take: 1
        })

        if(currentLogin){

          const clockOut = removeTime(new Date(req.body.clockOut))
          const clockIn = removeTime(currentLogin.clockIn)

          if(id === "admin"){
            let body = {
              id : currentLogin.id,
              userId : parseInt(req.body.userId as string),
              clockOut : new Date(req.body.clockOut),
            }
            const result = await onUpdateUserAttendance(body)
            res.status(200).json({ data : result })
          }else if(clockOut === clockIn){
            let body = {
              id : currentLogin.id,
              userId : parseInt(req.body.userId as string),
              clockOut : new Date(req.body.clockOut),
            }
            const result = await onUpdateUserAttendance(body)
            res.status(200).json({ data : result })
          }else{
            res.status(404).json({ message : 'You did not clock out previously please contact your admin...' })
          }
        }else{
          res.status(404).json({ message : 'User did not clock in this morning...' })
        }

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
