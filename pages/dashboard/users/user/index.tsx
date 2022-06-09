import { NextPage } from 'next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../../../components/button/Button';
import TextInput from '../../../../components/TextInput/TextInput';
import { emailValidation, phoneValidation, textValidation } from '../../../../helpers/forms/form';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router'
import { onCreateUser } from '../../../../network/userService';

const CreateUser : NextPage = ()=> {

  const { control, handleSubmit, } = useForm();
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const onSubmit = async (data : any) => {
    try {
      setIsLoading(true)
      const response = await onCreateUser(data)
      setIsLoading(false)
      router.back()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }


  return (
    <div className='p-5'>
        <a className='cursor-pointer flex flex-row items-center mb-5' onClick={()=>{ router.back() }}>
            <AiOutlineArrowLeft size={20} />
            <span className='text-gray-500 font-light text-sm mx-2'>Create User</span>
        </a>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='columns-xs gap-x-5 mb-5'>
          <TextInput control={control} name="first_name"  rules={textValidation('first name')}  type="text"   placeholder='First name'  />
          <TextInput control={control} name="last_name"   rules={textValidation('last name')}   type="text"   placeholder='Last name'  />
          <TextInput control={control} name="phone"       rules={phoneValidation}               type="tel"    placeholder='phone'  />
          <TextInput control={control} name="email"       rules={emailValidation}               type="email"  placeholder='email'  />
          <TextInput control={control} name="dob"         rules={{ required : "Your date of birth is required" }}               type="date"   placeholder='Date of birth'  />
          <TextInput control={control} name="role"        rules={{ required : 'Your role is required' }} placeholder="Role" type='select' select />
        </div>
        <Button name='Creare' IsLoading={IsLoading} />
      </form>
    </div>
  )
}

export default CreateUser