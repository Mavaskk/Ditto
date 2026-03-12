"use client"
import ConfimCard from '@/app/components/ConfirmCard/ConfirmCard'
import { useUserStore } from "@/store/useUserStore"


export default function Page () {

    const  travelPrefences = useUserStore(state => state.travelPrefences) 
    



  
  return (

        <div className="flex mx-10 flex-col justify-center items-center pt-20 ">	
            <ConfimCard confirmData={"preferences"} destination={travelPrefences.destination} budget={travelPrefences.slider} travelPace={travelPrefences.travel_pace} vibe={travelPrefences.vibe} departureDate={travelPrefences.departure_date} returnDate={travelPrefences.return_date} ></ConfimCard>
        </div>


    
    )



}