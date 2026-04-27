"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Card from "../components/Card/Card"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"


export default function JoinTravelPage() {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = ({ uuid }) => {
        router.push(`/joinTravel/${uuid.trim()}`)
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4">
            <Card className="w-full px-8 py-12 md:py-16 flex flex-col gap-6">

                <div className="flex flex-col gap-1 items-center">
                    <h1 className="text-3xl md:text-4xl font-semibold">Join a trip</h1>
                    <p className="text-gray-400 text-sm md:text-base">Enter the trip code shared by the organizer</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <Input
                        register={register}
                        name="uuid"
                        type="text"
                        label="Trip code"
                        placeholder="e.g. 0b3d9bec-ea3d-421c-a75e-adfabb879eda"
                        required={true}
                        suggestion="You can find this code in the invite link or message sent by the organizer"
                        error={errors.uuid}
                    />

                    {errors.uuid && (
                        <p className="text-red-500 text-xs -mt-3">{errors.uuid.message}</p>
                    )}

                    <div className="flex justify-center mt-2">
                        <Button type="submit" variant="primary">Join trip</Button>
                    </div>
                </form>

            </Card>
        </main>
    )
}
