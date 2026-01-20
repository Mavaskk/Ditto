"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { selectTravel, getUserName } from "@/app/actions/actions"
import image from "../../../assets/joinTravel.svg"


export default function Page ({params}) {

    const {slug} = use(params)

    const [travel,setTravel] = useState({})

    useEffect(() => {

        const fetchData = async () => {
            const {errorMessage,newTravel} = await selectTravel(slug)
            console.log(newTravel);
            const x = await getUserName(newTravel.user_id)
            console.log(errorMessage,x);
            setTravel(newTravel)            
        }

        const getUserName = async () => {

            




        }

        fetchData()
        getUserName()



    },[slug])
    


    return (
        <div>
        <h1>Welcome in <span></span>{travel.name}</h1>
        <p>You have been inveted by </p>

        <Image alt="travelPerson" fill src={"../../src/assets/joinTravel.svg"}></Image>


        </div>


    )
}
