

export default function DashboardPreferenceCard({preferences}) {

    console.log(preferences);

        const getDate = (date) => {
        if (!date) return null
        const d = date instanceof Date ? date : new Date(date)
        return d.toLocaleDateString('en-GB') // dd/mm/yyyy
    }
    



      const dataArray = JSON.parse(preferences.vibe); //lo parso in array



    return (
        <div className="rounded-3xl border border-black/[0.13] bg-white  py-12 px-2 w-full">
            <h2 className="md:px-5 text-2xl text-3xl   text-balance font-semibold  ">Your preferences</h2>
             <div className="mt-25 flex flex-col gap-2">
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Destination</p>
                                <p className="text-2xl md:text-2xl lg:text-3xl">{preferences.destination}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Number of travelers</p>
                                <p className="text-2xl md:text-2xl lg:text-3xl">{preferences.budget}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Travel pace</p>
                                <p className="text-2xl md:text-2xl lg:text-3xl">{preferences.travel_pace}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Vibe</p>
                                <p className="text-2xl md:text-2xl lg:text-3xl">{dataArray.map((item) => (item + ","))}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Departure date</p>
                                <p className="text-2xl md:text-2xl lg:text-3xl">{getDate(preferences.departure_date)}</p>
                            </div>
                            <div className="flex justify-between md:px-5">                           
                                <p className="text-gray-500 md:text-lg">Return date</p>
                                <p className="text-2xl md:text-2xl lg:text-3xl">{getDate(preferences.return_date)}</p>
                            </div>

            </div>

        </div>

    )
}