import { getTravelData,getUserTravelContext } from "@/app/actions/actions";
import DashboardPreferenceCard from "@/app/components/DashboardPreferenceCard";
import { redirect } from 'next/navigation'
import Button from "@/app/components/Button/Button";
import Image from "next/image";
import noResult from "../../../assets/no_results.svg"
import InviteCard from "@/app/components/InviteCard";




export default async function page({params}) {

        const { slug } = await params
        const {travel} = await getTravelData(slug)
        const suggestion = null
        

        const {isOrganizer,hasPreferences,preferences,travelUuid, numberOfPartecipants, maxParticipantsNumber} = await getUserTravelContext(slug)
            
        
        if (!hasPreferences && travelUuid) {
            
            console.log("No preference found");
            redirect(`/joinTravel/${travelUuid}/quiz`)
        }


        

                    
            // getQuizData()
            
        






    return(
        <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 mx-5 px-10 h-fit">
            <h1 className="text-4xl   text-balance font-semibold md:text-5xl ">Dashboard: <span>{travel.name} </span></h1>
            <div className="grid md:grid-cols-3 gap-2 mt-10">
                <div>
                    {preferences && (
                        <DashboardPreferenceCard preferences={preferences}/>

                    )}  

                </div>
                    <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 px-2 w-full">
                        <h2 className="md:px-5 text-2xl text-3xl   text-balance font-semibold  ">Ai suggestion</h2>
                        {suggestion ? (<p className="mt-2">Suggerimento</p>)
                            :
                        (
                            <div className="flex flex-col items-center mt-10">

                                <Image alt="noTravelsFound" src={noResult} className="w-40 "/>
                                <p className="text-gray-500 mt-2 text-2xl">No suggestion yet</p>
                                {isOrganizer && (
                                    <div>
                                        <Button className="mt-5">Generate suggetion</Button>
                                        <p className="text-center mt-1">Partecipants {numberOfPartecipants}/{maxParticipantsNumber}</p>
                                    </div>
                                )}

                            </div>
                            
                        )
                        
                    
                    }
                        
                    </div> 
                    <div>
                    <InviteCard uuid={travel.uuid}/>    
                    </div>                 


            </div>

        </div>
    )
}