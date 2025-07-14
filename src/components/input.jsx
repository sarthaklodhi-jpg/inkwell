import React, { useId } from 'react'

// Input component that supports forwarding refs and custom labels
export const Input = React.forwardRef(function Input({
    label,              // Optional label text for the input
    type = "text",      // Input type, defaults to 'text'
    className = "",     // Additional CSS classes for the input
    ...props            // Any other props (placeholder, onChange, etc.)
}, ref) {
    const id = useId() // Generate a unique id for this input/label pair
    return (
        <div className='w-full'>
            {/* If a label is provided, render it and link it to the input using htmlFor and id */}
            {label && (
                <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id} // Connects label to input for accessibility
                >
                    {label}
                </label>
            )}
            {/* The actual input element */}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}      // Forwarded ref for parent access
                {...props}    // Spread any additional props
                id={id}       // Unique id for accessibility
            />
        </div>
    )
})

export default Input