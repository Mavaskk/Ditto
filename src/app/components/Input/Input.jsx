

export default function Input({label,placeholder,type,name,register, error,required, suggestion}) {
    


            return (


                <div className="flex flex-col items-start gap-1 ">
                    <label className="text-[#375D06] ">{label}</label>
                    <input required = {required}  type={type} {...register(name,{})} placeholder={placeholder} className="ps-2 py-1 rounded-md w-full focus:border-[#375D06] focus:ring-0 focus:outline-none border border-black/[0.13]" />
                    {suggestion && <p className="text-gray-400 text-xs">{suggestion}</p>}
                    {error && <p>Errore</p>}
                </div>
            )


}












