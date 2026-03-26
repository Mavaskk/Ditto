import { getTravelData,getUserTravelContext } from "@/app/actions/actions";
import DashboardPreferenceCard from "@/app/components/DashboardPreferenceCard";


export default async function page({params}) {

        const { slug } = await params
        const {travel} = await getTravelData(slug)
        console.log(travel);
        

        const {isOrganizer,hasPreferences,preferences,travelUuid} = await getUserTravelContext(slug)
            
        console.log(isOrganizer,hasPreferences,preferences,travelUuid);
        
        if (!hasPreferences) {
            console.log(travelUuid);
            
            console.log("nn ci sono preferenze");
            
            // router.push(`/joinTravel/${travelUuid}/quiz`)
        }

            console.log("possiede preferenze",preferences);
        
            // getQuizData()
            
        






    return(
        <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 mx-5 px-10 h-fit">
            <h1 className="text-4xl   text-balance font-semibold md:text-5xl ">Dashboard: <span>{travel.name} </span></h1>
            <div className="grid md:grid-cols-3 mt-10">
                <div>
                    {preferences && (
                        <DashboardPreferenceCard preferences={preferences}/>

                    )}                    
                </div>



            </div>

        </div>
    )
}