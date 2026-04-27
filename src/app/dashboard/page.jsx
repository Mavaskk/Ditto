"use client"

import { useEffect, useState } from "react"
import { getUserData, getUserPreference } from "../actions/actions"
import TravelCard from "../components/TravelCard/TravelCard";
import Image from "next/image";
import Button from "../components/Button/Button";
import noResult from "../../assets/no_results.svg"




export default  function Page () {


    const [travelList,setTravelList] = useState([])
    const [loading,setLoading] = useState(true)
    const [empty,setEmpty] = useState(false)
  
    


    useEffect(() => {

        
        const checkOganizerQuiz =  async () => {//controllo se organizer ha inserito quiz
            const { travels } = await getUserData()

            if (travels.length === 0) {
                // mostra CTA
                setEmpty(true)
                
            } else {
                setTravelList(travels)
                
            }
            setLoading(false)



            // Tutti i viaggi da mostrare in lista → travels
            



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
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-4xl text-balance font-semibold md:text-5xl">Travels</h1>
                {!empty && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button link={"/joinTravel"} className="!px-4 !py-2 text-sm " variant="secondary">Join travel</Button>
                        <Button link={"/createTravel"} className="!px-4 !py-2 text-sm" variant="primary">Create travel</Button>
                    </div>
                )}
            </div>
            {empty ? (
                <div className="mt-10 flex flex-col justify-center items-center ">
                    <Image alt="noTravelsFound" src={noResult} className="w-50"/>
                    <p className="text-gray-500 mt-2 text-2xl">No travels found</p>
                    <div className="mt-5 flex flex-row gap-3">
                                <Button link={"/createTravel"} className="mt-10 " variant="primary">Create travel</Button> 
                                <Button link={"/joinTravel"} className="mt-10 " variant="secondary">Join travel</Button> 
                        
                    </div>
                </div>
            ) :
            
            (
                <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {travelList.map((travel) => (
                        <TravelCard key={travel.uuid} travel={travel}/>


                    ))}                
                </div>                
            )}


            </div>
            
        
        </>
    )
}