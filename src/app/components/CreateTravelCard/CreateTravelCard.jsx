"use client"

import Card from "../Card/Card"
import Input from "../Input/Input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Button from "../Button/Button"
import NumberInput from "../NumberInput/NumberInput"

export default function CreateTravelCard() {

        const [error,SetError] = useState(false)
    
        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm();

        const onSubmit = (data) => {
            console.log(data);
            
        }

    return(
        <Card className={" w-full  md:w-120 lg:w-150 md:py-16"}>
            <form className="flex flex-col gap-5"  onSubmit={handleSubmit(onSubmit)}>
                    <Input type={"text"} required={true} suggestion={"Give your trip a memorable name"}  name={"name"} register={register} error={errors.name} label={"Trip name"} placeholder={"e.g.,Summer 2026"}/>
                    <NumberInput required={true}  name={"name"} register={register} error={errors.name} label={"Trip name"} placeholder={"e.g.,Summer 2026"} />
                    <Button link={"confirm"} className="w-full text-center" variant="primary">Start a new trip</Button> 

            </form>
           


        </Card>
    )
}