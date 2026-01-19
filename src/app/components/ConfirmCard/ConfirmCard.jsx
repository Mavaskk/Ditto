import Card from "../Card/Card"
import Button from "../Button/Button";
import toast from "react-hot-toast";


export default function ConfimCard ({confirmData,numberTravelers,travelName,uuid}) {



    console.log(confirmData);
    

    return (

        <Card className=" w-full  md:w-120 lg:w-150 md:py-16">
            <div>
                <h2 className="text-4xl   text-balance font-semibold md:text-6xl  text-center">Thank you</h2>
                <p className="text-gray-500 mb-10 text-center text-sm md:text-xl mt-2 px-4">Your infromation has been recieved</p>
                { confirmData ? (
                        <div className="mt-25 flex flex-col gap-3">
                            <div className="flex justify-between">                           
                                <p className="text-gray-500 md:text-lg">Trip name</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{travelName}</p>
                            </div>
                            <div className="flex justify-between">                           
                                <p className="text-gray-500 md:text-lg">Number of travelers</p>
                                <p className="text-lg md:text-2xl lg:text-3xl">{numberTravelers}</p>
                            </div>
                            <div className="mt-20 flex flex-col items-center gap-2">
                                <p className="px-5 text-center py-2 rounded-xl border text-gray-500 border-black/[0.13]">{uuid}</p>
                                <p className="text-gray-500 md:text-md">or</p>
                                <Button onClick={() => toast("Link copiato")} type={"button"} style={"primary"}>Copy link</Button>



                            </div>

                            
                        </div>
                )
                :
                (
                    <div>
                        s
                    </div>


                )}



            </div>


        </Card>
    )
}