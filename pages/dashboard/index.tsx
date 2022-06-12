import { Attendance, User } from '@prisma/client'
import { capitalize, startCase } from 'lodash'
import moment from 'moment'
import { NextPage, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { onGetUserAttendancies } from '../../controller/AttendanceController'
import { toJson } from '../../helpers/forms/toJson'

const Index : NextPage<Props> = ({ Attendancies }: InferGetServerSidePropsType<typeof getServerSideProps>)=> {

    const router = useRouter()

    const [clockInUsers, setclockInUsers] = useState<number>(0)
    const [averageTemp, setAverageTemp] = useState<number>(0)
    const [averageAlcohol, setAverageAlcohol] = useState<number>(0)

    useEffect(() => {
        const temp = Attendancies.reduce((acc, curr) => {
            return acc + curr.temperature
        }, 0)
        setAverageTemp(temp / Attendancies.length)


        const alcohol = Attendancies.reduce((acc, curr) => {
            return acc + curr.alcoholLevel
        },0)
        setAverageAlcohol(alcohol / Attendancies.length)

        const clockIn = Attendancies.filter(attendance => attendance.clockIn !== null).length
        setclockInUsers(clockIn)

    }, [Attendancies])

    const formatDateTime = (date: Date) => {
        const dateTime = new Date(date)
        //format with momnentjs DD/MM/YYYY : HH:mm:ss
        //set time zone -2  
        dateTime.setHours(dateTime.getHours() - 2)
        return moment(dateTime).format('HH:mm:ss')
    }
    


  return (
    <div className='w-full h-[100%] p-5'>
      <div className='grid grid-cols-3 gap-4'>
        <div onClick={()=> router.push('/dashboard/users')} className='cursor-pointer hover:bg-indigo-500/80 flex flex-col bg-indigo-500 rounded-lg p-4'>
            <span className='text-white text-base'>Users</span>
            <span className='text-white text-xs'>Log in</span>
            <span className='text-white text-base'>{clockInUsers}</span>
        </div>
        <div className='flex flex-col bg-indigo-500 rounded-lg p-4'>
            <span className='text-white text-base'>Alcohol Level</span>
            <span className='text-white text-xs'>Average</span>
            <span className='text-white text-base'>{averageAlcohol.toFixed(2)} mg / L</span>
        </div>
        <div className='flex flex-col bg-indigo-500 rounded-lg p-4'>
            <span className='text-white text-base'>Temperature</span>
            <span className='text-white text-xs'>Average</span>
            <span className='text-white text-base'>{averageTemp.toFixed(2)} ℃</span>
        </div>
      </div>
      {
        //TABLE
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead className="border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            User
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Temperature Level
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Alcohol Level
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Role
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Clock in
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Clock out
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Attendancies && Attendancies.reverse().map((attendance: AttendanceItem, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.user?.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {startCase(`${attendance.user?.first_name} ${attendance.user?.last_name}`)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.temperature} ℃
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.alcoholLevel} mg / L
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.user?.role}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {formatDateTime(attendance.clockIn)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.clockOut && formatDateTime(attendance.clockOut)}
                                    </td>
                                    <td onClick={()=> router.push(`/dashboard/users/user/${attendance.user?.id}`)} className="cursor-pointer hover:text-indigo-500 text-sm text-indigo-900 font-md px-6 py-4 whitespace-nowrap">
                                        View
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
      }
    </div>
  )
}
export default Index


export const getServerSideProps = async( context : any ) => {

  let Attendancies : Attendance[] = []
  try {
    const result = await onGetUserAttendancies()
    Attendancies = toJson<Attendance[]>(result)
  } catch (error) {
    Attendancies = []
  }
  return{
    props : {
      Attendancies
    }
  }
}

type Props = {
  Attendancies : AttendanceItem[]
}

interface AttendanceItem extends Attendance {
    user? : User
}
