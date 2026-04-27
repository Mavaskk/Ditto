"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { selectTravel, getUsername } from "@/app/actions/actions"
import joinTravel from "../../../assets/joinTravel.svg"
import noResult from "../../../assets/no_results.svg"
import Button from "@/app/components/Button/Button"
import { checkParticipantsNumber } from "@/app/actions/actions"


export default function Page ({params}) {

    const {slug} = use(params)

    const [travel,setTravel] = useState({})
    const [username,setUsername] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [travelFull,setTravelFull] = useState(false)
    const [travelNotFound,setTravelNotFound] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            
            const {errorMessage,newTravel} = await selectTravel(slug)
            if (errorMessage) {
                setTravelNotFound(true)
                
            }
            
            setTravel(newTravel)
            //controllo nella tabella pubblica quanti partecipanti con quello uuid ci sono e quindi quanti partecipanti per ogni vacanza
            const maxParticipants = newTravel.number_of_travelers
            console.log(maxParticipants);

            const {participants,err} = await checkParticipantsNumber(slug)
            if (participants.length >= maxParticipants) {
                //disattivo bottone e cambio pagina dicendo che viaggio è full
                setTravelFull(travel)
                

            }
            
            

                        
            const {error,username} = await getUsername(newTravel.user_id)
            if (error) {
                console.log(error);
                
            }
            setUsername(username)
            setIsLoading(false)
        }

        fetchData()




    },[slug])



    if (travelNotFound) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <Image alt="notFound" src={noResult} className="w-40 mb-6" />
                <h1 className="text-3xl md:text-4xl font-semibold text-balance">Trip not found</h1>
                <p className="text-gray-400 text-sm md:text-base mt-2 max-w-sm">
                    The link you followed doesn&apos;t match any trip. It may be expired or incorrect.
                </p>
                <div className="mt-8">
                    <Button link="/joinTravel" variant="primary">Try with another code</Button>
                </div>
            </section>
        )
    }
    


    return (
        isLoading ? <p>Caricamento</p> : 
        <section className="flex mx-10 flex-col justify-center items-center pt-20 ">
        <h1 className="text-4xl   text-balance font-semibold md:text-6xl xl:text-8xl text-center">Welcome in <br /> <span className="font-normal">{travel.name}</span></h1>
        <p className="text-gray-500 text-center text-sm md:text-xl mt-5 px-4">You have been inveted by {username.username} </p>
        <div className="mt-20">
            <Image alt="travelPerson" className="w-45"  src={joinTravel}></Image>
           
        </div>
        {!travelFull ? (

        <div className="flex flex-col items-center mt-15 gap-2">
            <Button  link={`/joinTravel/${slug}/quiz`} variant={"primary"}>Join the group</Button>
            <Button link={`/login`} variant={"secondary"}>Login to dashboard</Button>
            
        </div>

        ):
        (

        <div className="flex flex-col items-center mt-15 gap-2">
            <p className="text-xl text-red-600">The travel is full contact the admin</p>
            <Button  link={`/signup?action=create`} variant={"primary"}>Create new Travel</Button>
            
        </div>
        )
        
        }



        </section >


    )
}
