'use client'
import { use, useEffect, useState } from 'react'
import { selectTravel } from '@/app/actions/actions'
import ConfimCard from '@/app/components/ConfirmCard/ConfirmCard'

export default function Page ({ params }) {

  const {slug} = use(params)
  const [travel,setTravel] = useState({})

	useEffect( () => {
		const fetchTravel = async () => {

			const {errorMessage,newTravel} = await selectTravel(slug)
			
			if (errorMessage) {
				console.log(errorMessage);
				
			}
			setTravel(newTravel)
		}


		fetchTravel()



	},[slug])

	useEffect(() => {
		console.log(travel);
		

	},[travel])
	
  
  return (

		<div className="flex mx-10 flex-col justify-center items-center pt-20 ">	
			<ConfimCard confirmData={"createTravel"} travelName = {travel.name} numberTravelers={travel.number_of_travelers} uuid ={travel.uuid}></ConfimCard>
		</div>


	
	)



}