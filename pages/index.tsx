import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import Button from '../components/button/Button'
import TextInput from '../components/TextInput/TextInput'
import { emailValidation, passwordValidPattern } from '../helpers/forms/form'
import { IAthResponse, IAuth } from '../models/IAth'
import { IResponse } from '../models/IResponse'
import { onLogin } from '../network/userService'
import { AlertProps, AlertType, AuthAtom, showErrorAtom } from '../provider/AuthAtom'


const Home: NextPage = (props) => {

  const { control, handleSubmit } = useForm()
  const [auth, setAuth] = useRecoilState<IAthResponse | null>(AuthAtom)
  const [_, showAlert] = useRecoilState<AlertProps>(showErrorAtom)
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSubmit = async ({ email, password }: any) => {
    try {
      setIsLoading(true)
      const { data } = await onLogin<IResponse<IAthResponse>>(email, password)
      if(data){
        setAuth(data ?? null)
        router.replace('/dashboard')
        showAlert({ type : AlertType.SUCCESS, message : `Welcome ${data?.first_name} ${data?.last_name}` })
        setIsLoading(false)
      }else{
        showAlert({ type : AlertType.ERROR, message : `failed to login` })
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      showAlert({ type : AlertType.ERROR, message : `${JSON.stringify(error)}` })
    }
  }

  return (
    <div className='bg-gray-100 flex w-full h-[100%] justify-center items-center'>
      <div className='bg-white rounded-xl shadow-lg p-8 m-8'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col w-90'>
          <TextInput control={control} name="email"     rules={emailValidation} type="email"  placeholder='Email'  />
          <TextInput control={control} name="password"  rules={passwordValidPattern} type="password"  placeholder='Password'  />
          <Button name='Login' IsLoading={IsLoading} />
        </form>
      </div>
    </div>
  )
}

export default Home
