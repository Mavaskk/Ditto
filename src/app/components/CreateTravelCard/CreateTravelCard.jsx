"use client"

import Card from "../Card/Card"
import Input from "../Input/Input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Button from "../Button/Button"
import NumberInput from "../NumberInput/NumberInput"
import { useRouter } from 'next/navigation'

import { createTravel } from "@/app/actions/actions"

export default function CreateTravelCard() {
            const router = useRouter();
        
        const [error,SetError] = useState(false)
    
        const {
            register,
            handleSubmit,
            setValue, 
            watch,
            formState: { errors }
        } = useForm();

        const onSubmit = async (data) => {
            const {result,travelUuid} = await createTravel(data);

            if (result && result.errorMessage) {
                console.log("Errore:", result.errorMessage);
            } else {
                console.log(travelUuid);
                router.push(`createTravel/confirm/${travelUuid}`)

            }
            
        }

    return(
        <Card className={" w-full  md:w-120 lg:w-150 md:py-16"}>
            <form className="flex flex-col gap-5"  onSubmit={handleSubmit(onSubmit)}>
                    <Input type={"text"} required={true} suggestion={"Give your trip a memorable name"}  name={"name"} register={register} error={errors.name} label={"Trip name"} placeholder={"e.g.,Summer 2026"}/>
                    <div className="mt-5">
                        <label className="text-[#375D06] md:text-lg ">Number of travelers</label>

                        <div className="flex flex-row justify-center mt-3">
                            <NumberInput setValue={setValue} watch={watch} placeholder={0}  required={true}  name={"number_of_travelers"} register={register} error={errors.name} label={"Trip name"}  />

                        </div>                        
                    </div>

                    <div className="flex justify-center mt-15">
                        <Button type={"submit"}  className=" text-center w-fit" variant="primary">Creare & invite freinds</Button> 

                    </div>

            </form>
           


        </Card>
    )
}