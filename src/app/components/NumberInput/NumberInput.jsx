"use client"

import Button from "../Button/Button"


export default function NumberInput({label,placeholder,name,register, error,required, suggestion,setValue, watch}) {

    const currentValue = watch(name) || 0; //con watch prendo il valore dal form

    const incrementValue = () => { //con setValue modifico il valore
        setValue(name,Number(currentValue) + 1)
    }

    const decrementValue = () => {
        setValue(name,Number(currentValue) - 1)
    }

    if(Number(currentValue) < 0) {
        setValue(name,0)
        

    }



    return(
        <div className="flex flex-row gap-3">
            <Button type="button" onClick={decrementValue}  className="text-center rounded-full  w-16 h-16 text-2xl  " variant="secondary" >-</Button>      
            <input required={required} {...register(name, { required })} type="number" placeholder={placeholder} className="focus:ring-0 text-6xl text-center w-18 focus:outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />  
            <Button type="button" onClick={incrementValue} className="text-center  w-16 h-16 rounded-full text-2xl " variant="secondary" >+</Button>
          
        </div>
   

 
    )
}