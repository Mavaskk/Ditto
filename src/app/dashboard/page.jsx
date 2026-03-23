"use client"

import { useEffect, useState } from "react"
import { getUserData, getUserPreference } from "../actions/actions"
import TravelCard from "../components/TravelCard/TravelCard";



export default  function Page () {


    const [travelList,setTravelList] = useState([])
    const [loading,setLoading] = useState(true)
  
    


    useEffect(() => {

        
        const checkOganizerQuiz =  async () => {//controllo se organizer ha inserito quiz
            const { travels } = await getUserData()

            if (travels.length === 0) {
                // mostra CTA
                console.log("Mostro cta");
                
            } else {
                setTravelList(travels)
                
            }
            setLoading(false)



            // Tutti i viaggi da mostrare in lista → travels
            

            // const {pending} = await getOrganizerQuizStatus()
            // console.log(pending);
            

            // if (pending.length > 0) {
            //         router.push(`/joinTravel/${pending[0]}/quiz`)
            // }
            // // getQuizData()
            

        }    

        

        checkOganizerQuiz()


    },[])



    if (loading) {
        //aggiungo spinner
        return (
        <p>Sto caricando</p>

        )
    }

    return (
        //mappo array viaggio e faccio menu dropdown e in base a viaggio selezionato mostro preferenze e partecipanti
        <>
            <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 mx-5 px-10">
            <h1 className="text-4xl   text-balance font-semibold md:text-5xl ">Travels</h1>
            <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {travelList.map((travel) => (
                    <TravelCard key={travel.uuid} travel={travel}/>


                ))}                
            </div>

            </div>
            
        
        </>
    )
}