import Link from "next/link";


export default function Button({children,href,className = "",variant}) {


    const baseStyles = "px-6 py-3 md:px-7 font-semibold text-md md:text-lg  xl:text-xl rounded-[10px]  "

    const variants = {
        primary : "text-[#ECFDB9] bg-[#375D06] hover:bg-[#284404]"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]  || variants.primary} ${className}`;

    if (href) {
        return (

            <Link className={combinedClassName}>{children}</Link>
        )

    }
    
    return(
        <button className={combinedClassName}>{children}</button>
    )

}