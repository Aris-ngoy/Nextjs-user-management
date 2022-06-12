import { NextPage } from 'next'
import React from 'react'
import { useRecoilState } from 'recoil';
import { IAthResponse } from '../../models/IAth';
import { AuthAtom } from '../../provider/AuthAtom';

const TopBar : NextPage = ()=> {

  const [auth, setAuth] = useRecoilState<IAthResponse | null>(AuthAtom);


  return (
    <div className='flex items-center justify-end px-4 flex-row w-full h-10 bg-stone-100'>
        {
          auth &&
          <div onClick={()=> setAuth(null)} className='cursor-pointer flex justify-center items-center h-10'>
            <span className='hover:text-indigo-900 text-indigo-700'>Logout</span>
          </div>
        }
    </div>
  )
}

export default TopBar