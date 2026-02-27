import AuthCard from "../components/AuthCard/AuthCard"

export default function page() {



    return(
        <div className="mx-4" >
         <section className="flex mx-10 flex-col justify-center items-center pt-20 pb-20">
                <h1 className="text-4xl   text-balance font-semibold md:text-6xl xl:text-8xl text-center">
                  Create an <span className="font-normal">account</span>
                </h1>

        </section>
        <section className="flex justify-center">
            <AuthCard mode={"signup"}/>


            
        </section>
        
        </div>
    )
}