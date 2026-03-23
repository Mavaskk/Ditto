"use client"
import { useRouter } from "next/navigation";


export default function TravelCard({travel}) {

    const router = useRouter();

    
    const redirect = () => {
        router.push(`/dashboard/${travel.uuid}`)

    }


    return (
        <div onClick={redirect} className="rounded-3xl px-5 py-4  hover:border-[#375D06] hover:border-1 border border-black/[0.13] bg-white w-fullì">
            <h2 className="text-2xl   text-balance font-semibold md:text-3xl ">{travel.name}</h2>
            <div className="mt-2">
                <p className="text-gray-500">Status: {travel.status}</p>
                <p  className="text-gray-500">Number of travelers: {travel.number_of_travelers}</p>
            </div>
        </div>
    )
}