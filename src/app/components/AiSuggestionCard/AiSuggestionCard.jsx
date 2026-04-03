"use client"
import Image from "next/image";
import Button from "../Button/Button";
import noResult from "../../../assets/no_results.svg"
import { use, useEffect, useState } from "react";
import { createAiSuggestion, getPreferencesByTravelUuid } from "@/app/actions/actions";


export default function AiSuggestionCard({reccomandation,numberOfPartecipants,maxParticipantsNumber,isOrganizer,travelUuid}) {


    const [suggestion,setSuggestion] = useState(reccomandation)
    const [loading,setLoading] = useState(false)

    const generateSuggestion = async () => {

        const {preferences} = await getPreferencesByTravelUuid(travelUuid)
        console.log(preferences);
        
        


        setLoading(true)

        const {response} = await createAiSuggestion(preferences)
        
        setSuggestion(response)
        setLoading(false)
        


    }




    return(
            <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 px-2 w-full">
                <h2 className="md:px-5 text-2xl text-3xl   text-balance font-semibold  ">Ai suggestion</h2>
                                {suggestion ? (<p className="mt-2"></p>)
                                    :
                                (
                                    <div className="flex flex-col items-center mt-10">
        
                                        <Image alt="noTravelsFound" src={noResult} className="w-40 "/>
                                        <p className="text-gray-500 mt-2 text-2xl">No suggestion yet</p>
                                        {isOrganizer && (
                                            <div>
                                                <Button onClick={() => generateSuggestion()} className="mt-5">Generate suggetion</Button>
                                                <p className="text-center mt-1">Partecipants {numberOfPartecipants}/{maxParticipantsNumber}</p>
                                            </div>
                                        )}
        
                                    </div>
                                    
                                )
                                
                            
                            }
                                
                            </div> 

    )
}