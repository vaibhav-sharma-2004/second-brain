import type { ReactElement } from "react";

interface ButtonProps {

    variant: 'primary' | 'secondary';
    size:"sm" | "md" | "lg";
    text:string;
    onClick: () => void;
    startIcon?: ReactElement; //? means optional property
    endIcon?: ReactElement;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm": "px-2 py-1 text-sm",
    "md": "px-4 py-2 text-md",
    "lg": "px-6 py-3 text-lg"
}

const defaultStyles = "rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200 ease-in-out"



export const Button =(props:ButtonProps)=>{
    
    return <button 
    className={
        `${variantStyles[props.variant]}
        ${defaultStyles}
        ${sizeStyles[props.size]}`
    }
   >
    {props.startIcon}
    {props.text}
    {props.endIcon}
    </button>
}