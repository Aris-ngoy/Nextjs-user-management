import type { NextPage } from 'next'
import { useForm } from "react-hook-form";

const Home: NextPage = () => {

  return (
    <div className='bg-gray-100 flex w-full h-[100%] justify-center items-center'>
      <div className='bg-white rounded-xl shadow-lg p-8 m-8'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <form className='mt-4 flex flex-col w-80'>
          <input placeholder='Email' className='rounded-lg border border-blue-500/70 my-2 p-2' />
          <input placeholder='Password' className='rounded-lg border border-blue-500/70 my-2 p-2' />
          <button className='rounded-lg border bg-blue-500 text-white border-blue-500/70 my-2 p-2'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Home
