import { NextPage } from 'next'
import React from 'react'
import { Control, Controller, FieldValues, useController } from 'react-hook-form'

const TextInput : NextPage<Props> = ({ control, name, rules, type, placeholder, select  } : Props)=> {

    const { fieldState, field } = useController({
        control,
        name,
        rules,
    })

  return (
    <div className='flex flex-col'>
        {
            select ?
            <select {...field}>
                <option value="">Please select</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER ADMIN</option>
            </select> :
            <input className={ fieldState.error && `focus:border-red-400 focus:ring-red-400`} {...field} type={type} placeholder={placeholder} />
        }
        {fieldState.error && <div className='text-[11px] text-red-400 w-80'>{fieldState.error.message}</div>}
    </div>)
}

export default TextInput

type Props = {
    control : Control<FieldValues, any>,
    name : string,
    rules : object,
    type : string,
    placeholder : string,
    select? : boolean,
}