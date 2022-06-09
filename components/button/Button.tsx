import { NextPage } from 'next'
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Button : NextPage<Props> = ({ name, type, IsLoading, onClick } : Props)=> {
  return (
    <button disabled={IsLoading} type={type === undefined ? type : "button"} 
        onClick={onClick} 
        className='flex flex-row items-center justify-center bg-indigo-500 text-white p-2 w-[365px] mt-2 self-start rounded-lg'>
            {IsLoading && <TailSpin wrapperClass='mr-2' width={18} height={18}  color="white" ariaLabel="loading-indicator" />}
            {IsLoading ? 'Loading...' : name}
        </button>
  )
}

export default Button

type Props = {
    name : string,
    type? : string,
    IsLoading : boolean,
    onClick? : ()=>void,
}