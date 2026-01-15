"use client"

import Card from "../Card/Card"
import Input from "../Input/Input"
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import { logIn } from "@/app/actions/actions";

export default function CardLogin() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit =  async (data) => {
        const {errorMessage} = await logIn(data)
        if (errorMessage) {
            console.log(errorMessage);
            
        }

        console.log(data);
    };




    return(
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                Log in 
                <Input type={"email"} required={true}  name={"email"} register={register} error={errors.email} label={"Email"} placeholder={"m@example.com"}/>
                <Input type={"password"} required={true}  name={"password"} register={register} error={errors.password} label={"Password"} />


                <Button className="w-full">Log in</Button>






            </form>



            
        </Card>

    )
}


