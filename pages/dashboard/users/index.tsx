import { NextPage, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineUserAdd } from 'react-icons/ai'
import { prisma } from '../..//../lib/prisma'
import { User } from "@prisma/client";
import { toJson } from '../../../helpers/forms/toJson'

import { capitalize } from 'lodash'

const Users : NextPage<Props> = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const router = useRouter()
///dashboard/users/user
  return (
    <div className='h-[100%] w-full'>
        <div className='flex flex-row p-3 shadow-md'>
            <a className='cursor-pointer flex flex-row items-center' onClick={()=>{ router.back() }}>
              <AiOutlineArrowLeft size={20} />
              <span className='text-gray-500 font-light text-sm mx-2'>User</span>
            </a>
            <a className='cursor-pointer flex flex-row items-center' onClick={()=>{ router.push('users/user') }}>
              <AiOutlineUserAdd size={20} />
              <span className='text-gray-500 font-light text-sm mx-2'>User</span>
            </a>
        </div>
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
                      First name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Last name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Email
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Role
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {
                      users && users.map((user: User, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {capitalize(user.first_name)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {capitalize(user.last_name)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {capitalize(user.email)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.role}
                          </td>
                          
                          <td onClick={()=> router.push(`users/user/${user.id}`)} className="cursor-pointer hover:text-indigo-500 text-sm text-indigo-900 font-md px-6 py-4 whitespace-nowrap">
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
    </div>
  )
}

export default Users


export const getServerSideProps = async( context : any ) => {

  let users : User[] = []
  try {
    const result = await prisma.user.findMany()
    users = toJson<User[]>(result)
  } catch (error) {
    users = []
  }
  return{
    props : {
      users
    }
  }
}

type Props = {
  users : User[]
}
