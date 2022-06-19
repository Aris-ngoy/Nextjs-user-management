import { Attendance } from '@prisma/client'
import { startCase } from 'lodash'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useRecoilState, useRecoilValue } from 'recoil'
import { formatDateTime } from '../../helpers/constants'
import { IAthResponse } from '../../models/IAth'
import { IResponse } from '../../models/IResponse'
import { onGetUserAttendanceData } from '../../network/attendanceService'
import { AuthAtom } from '../../provider/AuthAtom'


const Employee: NextPage = (props) => {

  const auth = useRecoilValue<IAthResponse | null>(AuthAtom)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([])
  
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [auth])

  const getData = async () =>{
    try {
      setIsLoading(true)
      const response = await onGetUserAttendanceData<IResponse<Attendance[]>>(auth?.id.toString()!)
      setAttendanceData(response.data ?? [])
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  


  return (
    <div className='bg-gray-100 flex flex-col w-full h-[100%]'>
      <div className='mt-4 bg-white p-3'>
          <h4 className='text-sm font-medium text-gray-900'>{`${auth?.first_name} ${auth?.last_name}`}</h4>
          <h6 className='text-gray-500 text-xs'>{`${auth?.email}`}</h6>
      </div>
      {
        IsLoading && <div className='flex justify-center items-center p-5'>
          <TailSpin wrapperClass='mr-2' width={18} height={18}  color="black" ariaLabel="loading-indicator" />
          <span className='text-xs font-medium text-gray-900'>Pleasse wait...</span>
          </div>
      }
      {
        //TABLE
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead className="border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Temperature Level
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Alcohol Level
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
                            attendanceData && attendanceData.reverse().map((attendance: Attendance, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.temperature} ℃
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.alcoholLevel} mg / L
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {formatDateTime(attendance.clockIn)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {attendance.clockOut && formatDateTime(attendance.clockOut)}
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

export default Employee
