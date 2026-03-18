"use client"

import { useEffect } from "react"
import { getOrganizerQuizStatus } from "../actions/actions"
import { useRouter } from "next/navigation";



export default  function Page () {

    const router = useRouter();
    


    useEffect(() => {
        const checkOganizerQuiz =  async () => {//controllo se organizer ha inserito quiz

            const {pending} = await getOrganizerQuizStatus()
            console.log(pending);
            

            if (pending.length > 0) {
                    router.push(`/joinTravel/${pending[0]}/quiz`)
            }

        }    

        checkOganizerQuiz()


    },[])





    return (
        <>
            <h1>Dashboard</h1> 
        
        </>
    )
}