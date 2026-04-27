"use client"

import Card from "../Card/Card"
import Button from "../Button/Button"
import { useForm, Controller } from "react-hook-form"
import Input from "../Input/Input"
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Chip from "../Chip/Chip";
import TabNav from "../TabBar/TabNav"
import { useUserStore } from "@/store/useUserStore"
import { useRouter, useParams } from 'next/navigation'

import { Calendar } from 'primereact/calendar';
import { userIsLogged, getParticipantStatus } from "@/app/actions/actions"
import { useEffect, useState } from "react"

const calendarPT = {
    root: { className: 'w-full' },
    input: { className: 'ps-2 py-1 rounded-md w-full focus:border-[#375D06] focus:ring-0 focus:outline-none border border-black/[0.13] text-sm' },
    panel: { className: 'bg-white border border-black/[0.13] rounded-lg p-3 shadow-md z-50 min-w-[260px]' },
    header: { className: 'flex items-center justify-between pb-2 mb-2 border-b border-black/[0.08]' },
    previousButton: { className: 'text-[#375D06] hover:bg-[#375D06]/10 p-1 rounded cursor-pointer flex items-center justify-center border-none bg-transparent' },
    nextButton: { className: 'text-[#375D06] hover:bg-[#375D06]/10 p-1 rounded cursor-pointer flex items-center justify-center border-none bg-transparent' },
    title: { className: 'flex gap-1' },
    monthTitle: { className: 'text-[#375D06] font-semibold text-sm cursor-pointer bg-transparent border-none hover:underline' },
    yearTitle: { className: 'text-[#375D06] font-semibold text-sm cursor-pointer bg-transparent border-none hover:underline' },
    table: { className: 'w-full border-collapse text-sm mt-1' },
    tableHeader: { className: '' },
    tableHeaderRow: { className: '' },
    weekDay: { className: 'p-1 text-center text-xs text-gray-400 font-semibold pb-2' },
    tableBody: { className: '' },
    tableBodyRow: { className: '' },
    day: { className: 'p-0.5 text-center' },
    dayLabel: ({ context }) => ({
        className: [
            'flex items-center justify-center w-8 h-8 mx-auto rounded-full cursor-pointer text-sm transition-colors',
            context.selected ? 'bg-[#375D06] text-white' : '',
            context.today && !context.selected ? 'border border-[#375D06] text-[#375D06]' : '',
            !context.selected && !context.today && !context.disabled ? 'hover:bg-[#375D06]/10 hover:text-[#375D06]' : '',
            context.disabled ? 'text-gray-300 cursor-not-allowed pointer-events-none' : '',
        ].filter(Boolean).join(' '),
    }),
}




    const PrettoSlider = styled(Slider)({
    color: '#375D06',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
        },
        '&::before': {
        display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#375D06',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
        transform: 'rotate(45deg)',
        },
    },
    });



export default function CreateTravelProfileCard() {

      
    

    const addPrefences = useUserStore((state) => state.updatePreferences) //state estrae direttamente la funzione che voglio senza usare {}
    const router = useRouter()

    const params = useParams()
    const uuid = params.slug //Estraggo uuid da link

    const [alreadySubmitted, setAlreadySubmitted] = useState(false)

    useEffect(() => {
        const checkPreferences = async () => {
            const { user } = await userIsLogged()
            if (!user) return // non loggato, mostra il form normalmente

            const { hasPreferences } = await getParticipantStatus(uuid)
            if (hasPreferences) setAlreadySubmitted(true)
        }
        checkPreferences()
    }, [])
    
    const {
            register,
            handleSubmit,
            control,
            watch,
            formState: { errors }
        } = useForm({
            defaultValues: {
                destination : "",
                slider : 500,
                vibe : [],
            }
        });

    const departureDate = watch("departure_date")

    const onSubmit = async (data) => {

            const {user} = await userIsLogged()
        
        const paces = ["Chill", "Balance", "Active"] // travelPace è indice e devo convertirlo a stringa
        const formattedData = {
            ...data,
            travel_pace : paces[data.travelPace - 1],
            travel_uuid: uuid

        }
        console.log(formattedData);
        

        addPrefences(formattedData)

        const checkStatus = localStorage.getItem("travelPrefences")
        if (checkStatus) {
            if (user) {
                console.log("loggato");
                
                router.push(`/joinTravel/${uuid}/confirm`)

                
            }
            else {
                router.push(`/signup/?TravelId=${uuid}`)

            }


            
        }
       
    }


    if (alreadySubmitted) {
        return (
            <Card className="w-full md:w-120 lg:w-150 md:py-16">
                <div className="flex flex-col items-center gap-3 text-center">
                    <p className="text-2xl font-semibold">You&apos;re already in!</p>
                    <p className="text-gray-500">You have already submitted your preferences for this trip.</p>
                    <Button link="/dashboard" variant="primary" className="mt-4">Go to dashboard</Button>
                </div>
            </Card>
        )
    }

    return (
        <Card className=" w-full  md:w-120 lg:w-150 md:py-16">
            <form className="flex flex-col gap-5 "  onSubmit={handleSubmit(onSubmit)}>
                <Input register={register} type={"text"} required={true} name={"destination"} error={errors.name} label={"Destination"} placeholder={"e.g. New York"} />

                <div>
                    <p>1. Your personal budget</p>
                    <div className="relative">
                              <Controller //serve per passare useForm a componenti esterni non nativi
                                control={control}
                                name="slider"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                <PrettoSlider onChange={onChange}
                                                onBlur={onBlur}
                                                selected={value} 
                                                min={200} max={1500}  defaultValue={750} 
                                                aria-label="Default" 
                                                valueLabelDisplay="auto" />
      
                                )}
                            />

                        
                    


                        <p className="absolute top-8 md:top-6">200</p>
                        <p className="absolute right-0 top-8 md:top-6">1500</p>
                    
                    </div>
                </div>
                <div>
                <p>2. The vibe</p>
                    <div className="mt-2 flex gap-2">
                        <Controller
                        name="vibe"
                        control={control}
                        defaultValue={[]} // Inizializza sempre come array vuoto
                        rules={{ 
                            validate: (value) => value.length > 0 || "Seleziona almeno una vibe" 
                        }}
                        render={({ field }) => (
                            
                            <div className="flex gap-2 flex-wrap">
                            {["Party", "Culture", "Relax", "Trekking", "On the road", "Mountain", "Sea"].map((label) => {
                                
                                const isSelected = field.value?.includes(label);  // Controlla se la label è presente nell'array


                                const handleToggle = () => {
                                const currentValues = field.value || [];
                                const nextValues = isSelected
                                    ? currentValues.filter((v) => v !== label) // Rimuovi se c'è
                                    : [...currentValues, label]; // Aggiungi se non c'è
                                
                                field.onChange(nextValues); //per scatenare re-render e aggiornare interfaccia
                                };

                                return (
                                <Chip
                                    key={label}
                                    label={label}
                                    selected={isSelected}
                                    onClick={handleToggle}
                                />
                                );
                            })}
                            </div>
                        )}
                        />
                    </div>
                    {errors.vibe && (
                        <p className="text-red-500 text-xs mt-1">{errors.vibe.message}</p>
                    )}
                </div>
                <div>
                    <p className="mb-2">3. Your pace</p>
                    <Controller
                    name="travelPace" // Il nome del campo nel tuo form
                    control={control}
                    defaultValue="2" // ID del tab selezionato di default
                    render={({ field }) => (
                        <TabNav 
                        className={""}
                        liTab={[{name : "Chill",id : "1"},{name : "Balance",id : "2"},{name : "Active",id : "3"}]} 
                        value={field.value} // Passiamo il valore del form alla tab
                        onChange={field.onChange} // Passiamo la funzione per aggiornare il form
                        />
                    )}
                    />                
                </div>
                <div>
                    <p className="mb-2">4. Duration</p>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[#375D06] md:text-lg">Departure</label>
                            <Controller
                                name="departure_date"
                                control={control}
                                rules={{ required: "Select a departure date" }}
                                render={({ field }) => (
                                    <Calendar
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        dateFormat="dd/mm/yy"
                                        minDate={new Date()}
                                        className="ps-2 py-1 rounded-md w-full focus:border-[#375D06] focus:ring-0 focus:outline-none border border-black/[0.13]"
                                        placeholder="dd/mm/yy"
                                        pt={calendarPT}
                                        unstyled
                                    />
                                )}
                            />
                            {errors.departure_date && <p className="text-red-500 text-xs mt-1">{errors.departure_date.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-[#375D06] md:text-lg">Return</label>
                            <Controller
                                name="return_date"
                                control={control}
                                rules={{ required: "Select a return date" }}
                                render={({ field }) => (
                                    <Calendar
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        className="ps-2 py-1 rounded-md w-full focus:border-[#375D06] focus:ring-0 focus:outline-none border border-black/[0.13]"
                                        dateFormat="dd/mm/yy"
                                        minDate={departureDate || new Date()}
                                        placeholder="dd/mm/yy"
                                        pt={calendarPT}
                                        unstyled
                                    />
                                )}
                            />
                            {errors.return_date && <p className="text-red-500 text-xs mt-1">{errors.return_date.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                                <Button >I&rsquo;m ready!</Button>
    
                </div>

            </form>


        </Card>
    )



}