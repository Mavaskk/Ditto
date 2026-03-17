"use client"

import { useEffect } from "react"
import { getOrganierQuizStatus } from "../actions/actions"


export default  function Page () {


    useEffect(() => {
        const checkOganizerQuiz =  async () => {//controllo se organizer ha inserito quiz

            const {data,error} = await getOrganierQuizStatus()


        }    

        checkOganizerQuiz()


    },[])





    return (
        <h1>Dashboard</h1>
    )
}