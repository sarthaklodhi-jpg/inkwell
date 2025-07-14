import React ,{useId}from 'react'
import { forwardRef } from 'react'

export function Select({
options,
label,
className = "",
...props
},ref){
    const id = useId() 

    return(
        <div className='w-full'>
            {label && <label className='' htmlFor={id}></label>}
            <select 
            {...props}
            id = {id}
            ref= {ref}
             className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    >
  {options?.map((option) =>(
    <option key={option} value={option}>
      {option}
    </option>
  ))}
    </select>
        </div>
    )
}

export default React.forwardRef(Select) // this allows the parent component to access the ref of the select element so that it can be used in forms or other components that require a ref to the select element.