import Card from "../Card/Card"
import Button from "../Button/Button";
import { useUserStore } from "@/store/useUserStore"
import toast from "react-hot-toast";
import { createPreference } from "@/app/actions/actions";


export default function ConfimCard ({confirmData,numberTravelers,travelName,uuid, destination, budget, travelPace, vibe = []}) {

    const link = `http://localhost:3000/joinTravel/${uuid}`
    const copylink = () => {
        navigator.clipboard.writeText(link)
    }


        

    const postData = async () => {
       if (confirmData === "preferences") {
            const preferences = useUserStore.getState().travelPrefences;
            //lo mando nella tabella preferences
            console.log();
            
            const {newPreference , error} = await createPreference()
            console.log(newPreference);
            
            


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
                            </div>,
                          <div className="mt-20 flex flex-col items-center gap-2">
                          
                                <Button onClick={postData} > See your Travel</Button> link={"/dashboard"}



                            </div>                            
                            
                        </div>


                )}



            </div>


        </Card>
    )
}