"use client"
import Image from "next/image";
import Button from "../Button/Button";
import noResult from "../../../assets/no_results.svg"
import { use, useEffect, useState } from "react";
import { createAiSuggestion, getPreferencesByTravelUuid } from "@/app/actions/actions";
import { betaLibrariesDocumentsExtractedTextSignedUrl } from "@mistralai/mistralai/funcs/betaLibrariesDocumentsExtractedTextSignedUrl.js";
import { div } from "motion/react-client";


export default function AiSuggestionCard({reccomandation,numberOfPartecipants,maxParticipantsNumber,isOrganizer,travelUuid}) {


    const [suggestion,setSuggestion] = useState("")
    const [loading,setLoading] = useState(false)

    const generateSuggestion = async () => {

        const {preferences} = await getPreferencesByTravelUuid(travelUuid)
        console.log(preferences);
        
        setLoading(true)

        const {response} = await createAiSuggestion(preferences,travelUuid)
        
        setSuggestion(response)
        setLoading(false)
    
    }

    useEffect(() => {
        
        setSuggestion(reccomandation)
    },[reccomandation])    


    useEffect(() => {

        console.log(suggestion);
        

    },[suggestion])



    return(
        <div className="rounded-3xl border md:px-8 border-black/[0.13] bg-white py-10 px-5 h-full w-full">

            <div className="relative">
                <h2 className="text-3xl md:text-4xl font-semibold">Ai suggestion</h2>

                {suggestion ? (
                    <div>
                        {/* Affinity badge */}
                        <div className="absolute top-0 right-0 bg-[#ECFDB9] text-[#375D06] text-sm font-medium px-3 py-2 rounded-full">
                            Affinity: {suggestion.affinity_score}/10
                        </div>

                        {/* Info grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12 mt-8">
                            <div className="flex gap-2">
                                <span className="text-gray-400">Destination:</span>
                                <span className="font-semibold">{suggestion.destination}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-gray-400">Duration days:</span>
                                <span className="font-semibold">{suggestion.duration_days}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-gray-400">Budget:</span>
                                <span className="font-semibold">{suggestion.budget}$</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-gray-400">Dates:</span>
                                <span className="font-semibold">{suggestion.duration}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-gray-400">Pace:</span>
                                <span className="font-semibold">{suggestion.pace}</span>
                            </div>
                        </div>

                        {/* Motivation */}
                        <div className="mt-7">
                            <h3 className="text-xl font-semibold mb-2">Motivation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{suggestion.compromise_notes}</p>
                        </div>
                        <div className="flex flex-col ">
                            {/* Travel Structure */}
                            <div className="mt-7">
                                <h3 className="text-xl font-semibold mb-4">Travel Structure</h3>
                                <ul className="flex flex-col">
                                    {suggestion.daily_sketch.map((day, i) => (
                                        <li key={i} className="flex gap-3 group">
                                            {/* Timeline */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-7 h-7 rounded-full bg-[#ECFDB9] border border-[#375D06]/20 text-[#375D06] text-xs font-semibold flex items-center justify-center shrink-0">
                                                    {i + 1}
                                                </div>
                                                {i < suggestion.daily_sketch.length - 1 && (
                                                    <div className="w-px flex-1 bg-[#375D06]/15 my-1"/>
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div className={`pb-4 ${i === suggestion.daily_sketch.length - 1 ? '' : ''}`}>
                                                <p className="text-xs text-[#375D06] font-medium mb-0.5">Day {i + 1}</p>
                                                <p className="text-sm text-gray-700 leading-relaxed">{day}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <Button onClick={() => generateSuggestion()}>
                                    {loading ? "Generating..." : "Generate suggestion"}
                                </Button>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center mt-10">
                        <Image alt="noTravelsFound" src={noResult} className="w-40"/>
                        <p className="text-gray-500 mt-2 text-2xl">No suggestion yet</p>
                        {isOrganizer && (
                            <div className="flex flex-col items-center gap-1 mt-4">
                                <Button onClick={() => generateSuggestion()}>
                                    {loading ? "Generating..." : "Generate suggestion"}
                                </Button>
                                <p className="text-center text-sm text-gray-400">
                                    Participants {numberOfPartecipants}/{maxParticipantsNumber}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}