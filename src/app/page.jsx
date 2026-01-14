import Button from "./components/Button/Button";
import CardLanding from "./components/CardLanding/CardLanding";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="flex mx-10 flex-col justify-center items-center pt-20 pb-20">
        <h1 className="text-4xl   text-balance font-semibold md:text-6xl xl:text-8xl text-center">
          Group travel <br /> no friend <span className="font-normal">Drama</span>
        </h1>
        <p className="text-gray-500 text-center text-sm md:text-xl mt-5 px-4">
          Skip the endless group chat. Let AI privately negotiate conflicting budgets and schedules.
        </p>
        <Button link={"/login"} className="mt-10 lg:mt-16" variant="primary">Start a new trip</Button>
      </section>

      {/* --- CAROUSEL / MARQUEE SECTION --- */}
      <section className="mt-10 mb-20">
        
        {/* Container carousel mobile */}
        <div className="flex  w-full overflow-hidden gap-8 md:hidden  ">
            

            <div className="flex animate-scroll">
                <CardLanding  size={"mobile"}/>
            </div>
            <div className="flex animate-scroll">
                <CardLanding size={"mobile"} />
            </div>



        </div>

      </section>

      <section className="mt-10 mb-20">
        
        <div className=" w-full overflow-hidden hidden md:flex justify-center  ">
            

            <div className="flex ">
                <CardLanding  size={"desktop"}/>
            </div>




        </div>

      </section>
    </div>
  );
}