"use client"
import Button from "./Button/Button"
import toast from "react-hot-toast";


export default function InviteCard({uuid}) {

    const link = `http://localhost:3000/joinTravel/${uuid}`
    const copylink = () => {
        navigator.clipboard.writeText(link)
    }


    return (
        <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 px-2 w-full h-full">
            <h3 className="mx-2 font-semibold text-xl">Invite link</h3>
                <div className="mt-5 flex flex-col items-center  gap-2">
                                <p className="px-5 text-center py-2 rounded-xl border text-gray-500 border-black/[0.13]">{uuid}</p>
                                <p className="text-gray-500 md:text-md">or</p>
                                <Button onClick={(e) => {toast("Link copiato"),copylink()}} type={"button"} variant={"secondary"}>Copy link</Button>



                            </div>
            
        </div>

    )
}