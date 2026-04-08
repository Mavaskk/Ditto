import { getAisuggestion, getTravelData,getUserTravelContext } from "@/app/actions/actions";
import DashboardPreferenceCard from "@/app/components/DashboardPreferenceCard";
import { redirect } from 'next/navigation'
import InviteCard from "@/app/components/InviteCard";
import AiSuggestionCard from "@/app/components/AiSuggestionCard/AiSuggestionCard";




export default async function page({params}) {

        const { slug } = await params
        const {travel} = await getTravelData(slug)
        
        const {aiSuggestion} = await getAisuggestion(travel)
        
        

        const {isOrganizer,hasPreferences,preferences,travelUuid, numberOfPartecipants, maxParticipantsNumber} = await getUserTravelContext(slug)
            
        
        if (!hasPreferences && travelUuid) {
            
            console.log("No preference found");
            redirect(`/joinTravel/${travelUuid}/quiz`)
        }


        

                    
            
        






    return(
        <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 mx-5 px-10 h-fit">
            <h1 className="text-4xl   text-balance font-semibold md:text-5xl ">Dashboard: <span>{travel.name} </span></h1>
            <div className="grid md:grid-cols-3 gap-2 mt-10">
                <div>
                    {preferences && (
                        <DashboardPreferenceCard preferences={preferences}/>

                    )}  

                </div>
                    <AiSuggestionCard travelUuid={slug} isOrganizer={isOrganizer} numberOfPartecipants={numberOfPartecipants} maxParticipantsNumber={maxParticipantsNumber} reccomandation={aiSuggestion}/> 
                    <div>
                    <InviteCard uuid={travel.uuid}/>    
                    </div>                 


            </div>

        </div>
    )
}