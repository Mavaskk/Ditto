"use client"

import Card from "../Card/Card"
import Input from "../Input/Input"
import { set, useForm } from "react-hook-form";
import Button from "../Button/Button";
import { logIn } from "@/app/actions/actions";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Nota: next/navigation, non next/router


export default function CardLogin() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"; //recupero il path dell'utente prima del login cosi o lo riporto li  o in dashboard

    const [error,SetError] = useState(false)

    const {
        register,
        handleSubmit,

        formState: { errors }
    } = useForm();

    const onSubmit =  async (data) => {
        const {errorMessage} = await logIn(data)
        if (errorMessage) {
            SetError(true)
            console.log(errorMessage);
            
        }
        else{
            router.push(callbackUrl);
            router.refresh(); // Spesso utile in Next.js per aggiornare i Server Components; // Reindirizza l'utente dove voleva andare originariamente

        }

        console.log(data);
    };




    return(

        <Card className={" w-full md:w-120 lg:w-150 md:py-16"}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                
                <h2 className="font-semibold text-2xl">Login</h2>
                <Input type={"email"} required={true}  name={"email"} register={register} error={errors.email} label={"Email"} placeholder={"m@example.com"}/>
                <Input type={"password"} required={true}  name={"password"} register={register} error={errors.password} label={"Password"} />

                {error && <p className="text-center text-red-600">Invalid credentials</p>}

                <Button  className="w-full">Log in</Button>

            





            </form>
            <div className="mt-5">
                <p className="text-center">Dont’ have an account?  <Link href={"/signup"} className="underline">Sign up</Link></p>

            </div>



            
        </Card>

    )
}


