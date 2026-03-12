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
    const action = searchParams.get("action") ; //se url contiene params action vuol dire che deve creare il travel perchè arriva da landing
    const redirectPath = action === "create" ? "/createTravel" : "/dashboard";


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
                router.push(redirectPath);
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
                await addUsername(data.username)          
                const checkStorage = localStorage.getItem("travelPrefences");
                
                if (checkStorage) {
                    const travelUuid = searchParams.get("TravelId") 
                    console.log("Local storage trovato")
                    
                    //mando al db con le preferenze e poi pulisci

                    
                    return router.push(`/joinTravel/${travelUuid}/confirm`)


                }
                
                return router.push(redirectPath);

                

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


