import { useRouter } from 'next/router';
import React from 'react'
import { FiHome } from 'react-icons/fi';
import NavBarItem from './NavBarItem';

export default function NavBar() {

  const router = useRouter()

  return (
    <div className='w-[200px] h-[100%] flex bg-indigo-500 p-3'>
        <div className='flex flex-col justify-between items-center mt-20 py-2'>
            <NavBarItem onClick={()=> router.replace('/dashboard')} icon={<FiHome className='text-white' size={'1.2em'} />} />
        </div>
    </div>
  )
}
