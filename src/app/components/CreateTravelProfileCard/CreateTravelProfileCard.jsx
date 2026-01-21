"use client"

import Card from "../Card/Card"
import Button from "../Button/Button"
import { useForm } from "react-hook-form"
import Input from "../Input/Input"

export default function CreateTravelProfileCard() {
       
    const {
            register,
            handleSubmit,
            setValue, 
            watch,
            formState: { errors }
        } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        
              
    }


    return (
        <Card className=" w-full  md:w-120 lg:w-150 md:py-16">
            <form className="flex flex-col gap-5 "  onSubmit={handleSubmit(onSubmit)}>
                <Input register={register} type={"text"} required={true} name={"destination"} error={errors.name} label={"Destination"} placeholder={"e.g. Mountain"} />

                <div>
                    <p>1. Your budget</p>
                    {/* Slider */}
                </div>
                <div>
                    <p>2. The vibe</p>
                    {/* Slider */}
                </div>
                <div>
                    <p>3. Your pace</p>
                    {/* Slider */}
                </div>
                <div className="flex justify-center">
                                <Button >I&rsquo;m ready!</Button>
    
                </div>

            </form>


        </Card>
    )



}