import { NextPage } from 'next'
import React from 'react'

const TopBar : NextPage = ()=> {
  return (
    <div className='flex items-center justify-end px-4 flex-row w-full h-14 bg-stone-100'>
        <div className='items-center'>
            <span>
                <a className='text-indigo-700'>Logout</a>
            </span>
        </div>
    </div>
  )
}

export default TopBar