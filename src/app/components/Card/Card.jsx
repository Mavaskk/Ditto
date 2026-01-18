

export default function Card({children,className}) {


    const baseStyles = "rounded-3xl border border-black/[0.13] bg-white  py-12 px-3 "

    const combinedClassName = `${baseStyles} ${className}`;



    return(
        <div className="w-full flex justify-center md:w-120 lg:w-150 md:py-16">

            <div className={combinedClassName}>

                {children}


            </div>            
        </div>


    )





}