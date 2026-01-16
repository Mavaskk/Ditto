"use client"

import Card from "../Card/Card"
import Input from "../Input/Input"
import { set, useForm } from "react-hook-form";
import Button from "../Button/Button";
import { logIn, signUp, addUsername } from "@/app/actions/actions";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Nota: next/navigation, non next/router


export default function AuthCard({mode}) {

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
        if (mode === "login") {

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
        }
        else {
            const {errorMessage} = await signUp(data)
            if (errorMessage) {
                SetError(true)
                console.log(errorMessage);
                
            }
            else{
                const {errorMessage: err} = await addUsername(data.username)
                if (err) {
                   
                }                    router.push(callbackUrl);



            }

        }

        }





    return(

        <Card className={" w-full md:w-120 lg:w-150 md:py-16"}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                
                <h2 className="font-semibold text-2xl">{mode === "login" ? "Log in" : "Signup"}</h2>
                {mode === "signup" &&                 <Input type={"text"} required={true}  name={"username"} register={register} error={errors.password} placeholder={"Mark12"} label={"Username"} />
}
                <Input type={"email"} required={true}  name={"email"} register={register} error={errors.email} label={"Email"} placeholder={"m@example.com"}/>
                <Input type={"password"} required={true}  name={"password"} register={register} error={errors.password} label={"Password"} />

                {error && <p className="text-center text-red-600">{mode === "login" ? "Invalid Credentials" : "User Already exists"}</p>}

                <Button  className="w-full">{mode === "login" ? "Log in" : "Signup"}</Button>

            





            </form>
            <div className="mt-5">
                {mode === "login" ?  <p className="text-center">Dont’ have an account?  <Link href={"/signup"} className="underline">Sign up</Link></p>
                        : 
                        <p className="text-center">Do you have an account? <Link href={"/login"} className="underline">Log in</Link></p>
                        
                }
                

            </div>



            
        </Card>

    )
}


