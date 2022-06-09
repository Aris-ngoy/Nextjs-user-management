import { Attendance, User } from '@prisma/client'
import { NextPage, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft, AiOutlineExport } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { TailSpin } from 'react-loader-spinner'
import Button from '../../../../components/button/Button'
import DialogComponent from '../../../../components/dialog/Dialog'
import TextInput from '../../../../components/TextInput/TextInput'
import { formatDateTime } from '../../../../helpers/constants'
import { emailValidation, phoneValidation, textValidation } from '../../../../helpers/forms/form'
import { IResponse } from '../../../../models/IResponse'
import { onClockingOut } from '../../../../network/attendanceService'
import { onGetUser, onUpdateUser } from '../../../../network/userService'

const UserEdit : NextPage<Props> = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>)=> {

  const { control, handleSubmit, setValue } = useForm({ criteriaMode : "all" });
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [IsClockingOut, setIsClockingOut] = useState<boolean>(false)
  const [currentIndex, setcurrentIndex] = useState(0)
  const [OpenDialog, setOpenDialog] = useState<boolean>(false)
  const [User, setUser] = useState<IUser>()

  useEffect(() => {
    ongetUser(id)    
  }, [id])

  const ongetUser = async (id : number) => {
    try {
      setIsLoading(true)
      const { data } = await onGetUser<IResponse<IUser>>(id)

      setUser(data)

      // Object.keys(data!).forEach((key) => {
        
      //   if(key !== 'id'){
      //     setValue(key, data![key])
      //   }
      //   if(key === 'dob'){
      //     setValue(key, data![key].split('T')[0])
      //   }
      // })

      if(data){
        setValue('first_name', data.first_name)
        setValue('last_name', data.last_name)
        setValue('phone', data.phone)
        setValue('email', data.email)
        setValue('dob', data.dob?.toString().split('T')[0])
        setValue('role', data.role)
      }

      //where clockOut is null
      const attendancesItems = data?.attendance.filter(x => x.clockOut === null)
      setAttendances(attendancesItems ?? [])

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  

  const onSubmit = async (data : any) => {
    try {
      setIsLoading(true)
      const userData = {
        ...data
      }
      //exclude attendance
      delete userData.attendance
      delete userData.createdAt
      delete userData.updatedAt
      delete userData.id
      
      const response = await onUpdateUser(id, userData)
      setIsLoading(false)
      router.back()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const onClockOut = async (index : number, attendance : Attendance)=>{
      setcurrentIndex(index)
      try {
          setIsClockingOut(true)
          const id = attendance.id
          const userId = attendance.userId
          const clockOut = new Date()
          const clockIn = attendance.clockIn
          const body = {
            clockIn,
            clockOut,
            userId
          }
         const result = await onClockingOut(id,body)
         setIsClockingOut(false)
         router.back()
      } catch (error) {
        setIsClockingOut(false)
        alert(error)
      }
  }

  return (
    <div className=''>
        <div className='flex flex-row items-center justify-between p-3 shadow-md'>
          <a className='cursor-pointer flex flex-row items-center' onClick={()=>{ router.back() }}>
            <AiOutlineArrowLeft size={20} />
            <span className='text-gray-500 font-light text-sm mx-2'>User</span>
          </a>
          <a className='cursor-pointer flex flex-row items-center' onClick={()=> setOpenDialog(true)}>
            <AiOutlineExport size={20} />
            <span className='text-gray-500 font-light text-sm mx-2'>Export</span>
          </a>
        </div>
       <div className='flex flex-row'>
        <fieldset className='flex-1 m-5 border border-gray-400 rounded-md'>
            <legend className='mx-5 text-sm font-medium text-gray-900'>User details</legend>
            <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
              <div className='columns-xs gap-x-5 mb-5'>
                <TextInput control={control} name="first_name"  rules={textValidation('first name')}  type="text"   placeholder='First name'  />
                <TextInput control={control} name="last_name"   rules={textValidation('last name')}   type="text"   placeholder='Last name'  />
                <TextInput control={control} name="phone"       rules={phoneValidation}               type="tel"    placeholder='phone'  />
                <TextInput control={control} name="email"       rules={emailValidation}               type="email"  placeholder='email'  />
                <TextInput control={control} name="dob"         rules={{ required : "Your date of birth is required" }}               type="date"   placeholder='Date of birth'  />
                <TextInput control={control} name="role"        rules={{ required : 'Your role is required' }} placeholder="Role" type='select' select />
              </div>
              <Button name='Update' IsLoading={IsLoading} />
            </form>
        </fieldset>
        <fieldset className='m-5 border border-gray-400 rounded-md'>
            <legend className='mx-5 text-sm font-medium text-gray-900'>Clock In or Out</legend>
            {
              attendances.map((attendance: Attendance, index:number) => (
                <div onClick={()=> onClockOut(index, attendance)} key={index} className='flex flex-row items-center border border-gray-500 mx-2 rounded-lg p-1'>
                  <span className=' text-gray-500 font-light text-sm mx-2'>{formatDateTime(attendance.clockIn)}</span>
                  <a className='p-2 flex justify-center items-center cursor-pointer hover:bg-red-500/60 bg-red-500/80 rounded-md ml-1'>
                    {
                      IsClockingOut && currentIndex === index ? 
                        <TailSpin width={14} height={14}  color="white" ariaLabel="loading-indicator" />
                      : <FiLock />
                    }
                  </a>
                </div>
              ))
            }
        </fieldset>
      </div>
      {
       User &&  <DialogComponent id={User.id} open={OpenDialog} handleClose={()=> setOpenDialog(false)}  />
      } 
    </div>
  )
}

export default UserEdit

export const getServerSideProps = async( context : any ) => {

  return{
    props : {
      id : context.params.userId
    }
  }
}

type Props = {
  id : any
}

interface IUser extends User {
  attendance : Attendance[]
}