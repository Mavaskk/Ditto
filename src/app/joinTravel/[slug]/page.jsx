"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { selectTravel, getUsername } from "@/app/actions/actions"
import joinTravel from "../../../assets/joinTravel.svg"
import Button from "@/app/components/Button/Button"


export default function Page ({params}) {

    const {slug} = use(params)

    const [travel,setTravel] = useState({})
    const [username,setUsername] = useState({})

    useEffect(() => {
        //aggiungere controllo se i partecipanti sono gia completi rispetto al numero inserito in travels

        const fetchData = async () => {
            const {errorMessage,newTravel} = await selectTravel(slug)
            if (errorMessage) {
                console.log(errorMessage);
                
            }
            setTravel(newTravel)            
            const {error,username} = await getUsername(newTravel.user_id)
            if (error) {
                console.log(error);
                
            }
            setUsername(username)
        }

        fetchData()



    },[slug])
    


    return (
        <section className="flex mx-10 flex-col justify-center items-center pt-20 ">
        <h1 className="text-4xl   text-balance font-semibold md:text-6xl xl:text-8xl text-center">Welcome in <br /> <span className="font-normal">{travel.name}</span></h1>
        <p className="text-gray-500 text-center text-sm md:text-xl mt-5 px-4">You have been inveted by {username.username} </p>
        <div className="mt-20">
            <Image alt="travelPerson" className="w-45"  src={joinTravel}></Image>
           
        </div>
        <div className="flex flex-col items-center mt-15 gap-2">
            <Button link={`/joinTravel/${slug}/quiz`} variant={"primary"}>Join the group</Button>
            <Button link={`/login`} variant={"secondary"}>Login to dashboard</Button>
            
        </div>


        </section >


    )
}
