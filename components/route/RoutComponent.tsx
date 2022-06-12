import { Alert, Snackbar } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IAthResponse } from '../../models/IAth'
import { AlertProps, AlertType, AuthAtom, showErrorAtom } from '../../provider/AuthAtom'

const RoutComponent : NextPage<Props> = ({ children })=> {
    const auth = useRecoilValue<IAthResponse | null>(AuthAtom)
    const [alert, showAlert] = useRecoilState<AlertProps>(showErrorAtom)

    const router = useRouter()

    useEffect(() => {
        if(auth  === null) {
            router.replace('/')
        }
    }, [auth])

    useEffect(() => {
      setTimeout(() => {
          showAlert({ type : AlertType.NONE, message : '' })
      }, 3000);
    }, [alert])
    

    const hideAlert = () => {
        showAlert({ type : AlertType.NONE, message : ''})
    }
    

  return (
    <div className='flex flex-col w-full'>
    {
        alert.type === AlertType.ERROR &&
        <Alert onClose={hideAlert} severity="error">{alert.message}</Alert>
    }
    {
        alert.type === AlertType.SUCCESS &&
        <Alert onClose={hideAlert} severity="success">{alert.message}</Alert>
    }
    {children}
    </div>
  )
}

export default RoutComponent

type Props = {
    children: React.ReactNode
}