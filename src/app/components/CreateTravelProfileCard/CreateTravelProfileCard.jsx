"use client"

import Card from "../Card/Card"
import Button from "../Button/Button"
import { useForm } from "react-hook-form"
import Input from "../Input/Input"
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

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
       
    const {
            register,
            handleSubmit,
            setValue, 
            watch,
            formState: { errors }
        } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        
              
    }




    return (
        <Card className=" w-full  md:w-120 lg:w-150 md:py-16">
            <form className="flex flex-col gap-5 "  onSubmit={handleSubmit(onSubmit)}>
                <Input register={register} type={"text"} required={true} name={"destination"} error={errors.name} label={"Destination"} placeholder={"e.g. Mountain"} />

                <div>
                    <p>1. Your personal budget</p>
                    <div className="relative">
                            <PrettoSlider min={200} max={1500} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />


                        <p className="absolute top-8 md:top-6">200</p>
                        <p className="absolute right-0 top-8 md:top-6">1500</p>
                    
                    </div>

                    {/* Slider */}
                </div>
                <div>
                    <p>2. The vibe</p>
                    {/* Slider */}
                </div>
                <div>
                    <p>3. Your pace</p>
                    {/* Slider */}
                </div>
                <div className="flex justify-center">
                                <Button >I&rsquo;m ready!</Button>
    
                </div>

            </form>


        </Card>
    )



}