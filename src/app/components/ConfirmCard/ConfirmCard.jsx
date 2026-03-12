import Card from "../Card/Card"
import Button from "../Button/Button";
import { useUserStore } from "@/store/useUserStore"
import toast from "react-hot-toast";
import { createPreference } from "@/app/actions/actions";
import { useRouter } from 'next/navigation'



export default function ConfimCard ({confirmData,numberTravelers,travelName,uuid, destination, budget, travelPace, vibe = [],departureDate,returnDate}) {

    const link = `http://localhost:3000/joinTravel/${uuid}`
    const copylink = () => {
        navigator.clipboard.writeText(link)
    }
    const router = useRouter()

    const clearPreferences = useUserStore((state) => state.clearPreferences);        

    const getDate = (date) => {
        if (date) {
        const dateOnly = date.substring(0, 10);
        return  dateOnly            
        }



    }

    const postData = async () => {
       if (confirmData === "preferences") {
            const preferences = useUserStore.getState().travelPrefences;
            
            //lo mando nella tabella preferences
            
            const {error} = await createPreference(preferences)
            
            if (error) {
                throw Error("Errore nel salvare preferenze db", error)
            }

            clearPreferences()
            useUserStore.persist.clearStorage(); //forzo e cancello direttamente la key nel localstorage
            router.push("/dashboard")
            
            


       }

    }

    

    return (

        <Card className=" w-full  md:w-120 lg:w-150 md:py-16">
            <div>
                <h2 className="text-4xl   text-balance font-semibold md:text-6xl  text-center">Thank you</h2>
                <p className="text-gray-500 mb-10 text-center text-sm md:text-xl mt-2 px-4">Your infromation has been recieved</p>
                { confirmData === "createTravel" ? (
                        <div className="mt-25 flex flex-col gap-3">
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Trip name</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{travelName}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Number of travelers</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{numberTravelers}</p>
                            </div>
                            <div className="mt-20 flex flex-col items-center gap-2">
                                <p className="px-5 text-center py-2 rounded-xl border text-gray-500 border-black/[0.13]">{uuid}</p>
                                <p className="text-gray-500 md:text-md">or</p>
                                <Button onClick={(e) => {toast("Link copiato"),copylink()}} type={"button"} style={"primary"}>Copy link</Button>



                            </div>

                            
                        </div>
                )
                :
                (
                        <div className="mt-25 flex flex-col gap-3">
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Destination</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{destination}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Budget</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{budget}€</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Travel Pace</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{travelPace}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Vibe</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{vibe.map((item) => (item + ","))}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Departure Date</p>
                                <p className="text- md:text-2xl lg:text-3xl">{getDate(departureDate)}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Return Date</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{getDate(returnDate)}</p>
                            </div>
                          <div className="mt-20 flex flex-col items-center gap-2">
                          
                                <Button onClick={postData} > See your Travel dashboard</Button> 



                            </div>                            
                            
                        </div>


                )}



            </div>


        </Card>
    )
}