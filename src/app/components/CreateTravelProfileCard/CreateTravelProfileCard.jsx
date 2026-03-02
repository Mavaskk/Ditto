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

    
    
    const {
            register,
            handleSubmit,
            control,
            formState: { errors }
        } = useForm({
            defaultValues: {
                destination : "",
                slider : 500,
                vibe : [],
            }
        });

    const onSubmit = async (data) => {
        
        const paces = ["Chill", "Balance", "Active"] // travelPace è indice e devo convertirlo a stringa
        const formattedData = {
            ...data,
            travel_pace : paces[data.travelPace - 1],

        }

        addPrefences(formattedData)

        const checkStatus = localStorage.getItem("travelPrefences")
        if (checkStatus) {
            router.push(`/signup/?TravelId=${uuid}`)

            
        }
       
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
                <p>2. The vibe (Selezione multipla)</p>
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
                <div className="flex justify-center mt-5">
                                <Button >I&rsquo;m ready!</Button>
    
                </div>

            </form>


        </Card>
    )



}