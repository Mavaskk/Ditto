import Link from "next/link";


export default function Button({children,link,className = "",variant,type,disabled, onClick}) {


    const baseStyles = "px-6 py-3 md:px-7 font-semibold text-md md:text-lg  xl:text-xl rounded-[10px]  "

    const variants = {
        primary : "text-[#ECFDB9] bg-[#375D06] hover:bg-[#284404] disabled:",
        secondary : "text-[#375D06] bg-[#ECFDB9] hover:bg-[#CCDD9A] disabled: stroke-[#BBE388]"
    }

    const combinedClassName = `${baseStyles} ${variants[variant]  || variants.primary} ${className}`;

    if (link) {
        return (

            <Link  href={link} className={combinedClassName}>{children}</Link>
        )

    }
    
    return(
        <button onClick={onClick} disabled={disabled} type={type} className={combinedClassName}>{children}</button>
    )

}