import CreateTravelProfileCard from "@/app/components/CreateTravelProfileCard/CreateTravelProfileCard"

export default function page () {



    return (
        <section className="flex mx-10 flex-col justify-center items-center pt-20 ">
        <h1 className="text-4xl mb-10 md:mb-0  text-balance font-semibold md:text-6xl xl:text-8xl text-center">Define  <span className="font-normal">your</span> preference</h1>
            <CreateTravelProfileCard/>

        </section>
    )
}