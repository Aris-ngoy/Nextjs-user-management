import React from 'react'

const NavBarItem = ({ onClick, icon, title } : Props)=>{
  return (
    <a onClick={onClick} className='flex flex-row items-center rounded-lg w-full border-2 border-white p-2 my-1'>
       { icon }
        <span className='ml-2 text-white'>{title}</span>
    </a>
  )
}
export default NavBarItem

type Props = {
  onClick? : ()=>void,
  icon : React.ReactNode,
  title : string
}
