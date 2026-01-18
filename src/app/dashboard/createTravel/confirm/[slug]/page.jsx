'use client'
import { use, useEffect, useState } from 'react'
import { selectTravel } from '@/app/actions/actions'
import Card from '@/app/components/Card/Card'

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
	

  
  return (
		<Card> 

			<div>My uuid: {slug}</div>
			<div>{travel.name}</div>

		</Card>
	
	)



}