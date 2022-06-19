import { useRouter } from 'next/router';
import React from 'react'
import { FiHome, FiUser } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { IAthResponse } from '../../models/IAth';
import { AuthAtom } from '../../provider/AuthAtom';
import NavBarItem from './NavBarItem';

export default function NavBar() {

  const auth = useRecoilValue<IAthResponse | null>(AuthAtom);
  const router = useRouter()


  return (
    <div className={ auth ? 'w-[200px] h-[100%] flex bg-indigo-500 p-3' : ''}>
        <div className='flex flex-col justify-start items-center mt-20 py-2'>
          {
            auth && auth.role === 'ADMIN' || auth?.role === "SUPER_ADMIN" &&
            <NavBarItem title='Dashboard' onClick={()=> router.replace('/dashboard')} icon={<FiHome className='text-white' size={'1.2em'} />} />
          }
          {
            auth && auth.role === 'ADMIN' || auth?.role === "SUPER_ADMIN" &&
            <NavBarItem title='Profile' onClick={()=> router.replace('/employee')} icon={<FiUser className='text-white' size={'1.2em'} />} />
          }
        </div>
    </div>
  )
}
