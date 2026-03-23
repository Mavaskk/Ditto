"use server"
import { createSupabaseClient } from "@/app/auth/server";


export async function addUsername(username) {
    try {
            const supabase  = await createSupabaseClient();
            const {error} = await supabase
            .from("users_data")
            .insert([
            { username: username , 
               
            }])
            console.log(error)


        if (error) {
            return {errorMessage: error}
        }        
        

    }
    catch(err) {
        console.log(err);
        
    }
    
}

export async function userIsLogged() {
        const supabase = await createSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()

     return {user}
}

export async function checkParticipantsNumber(param) {

    try {
            const supabase  = await createSupabaseClient();
            const {data : participants, error} = await supabase
            .from("public_participants_info")
            .select()
            .eq('travel_uuid', param)
            

        if (error) {
            console.log(error);
            return {errorMessage: error}
            
            
        }       
        console.log(participants);
        
        return { errorMessage: null, participants }; 
    }

    catch (err) {
        console.log(err);
        
        
    }

}

export async function createTravel(data) {
    try {
            const supabase  = await createSupabaseClient();
            const {data:newTravel, error} = await supabase
            .from("travels")
            .insert([
            { name: data.name ,
              number_of_travelers: data.number_of_travelers,
              status: "created"


               
            }])
            .select("uuid") // <--- Chiedi a Supabase di restituirti uuid appena creato
            .single();    // <--- Dici a Supabase che ti aspetti un solo oggetto

        if (error) {
            return {errorMessage: error}
        }       
        return { errorMessage: null, travelUuid: newTravel.uuid }; 
        

    }
    catch(err) {
        console.log(err);
        
    }
    
}

export async function createPreference(params) {

    try {
            const supabase = await createSupabaseClient();

            // Recupero utente corrente
            const { data: { user } } = await supabase.auth.getUser();

            // Controllo se è l'organizzatore del viaggio
            const { data: ownedTravel } = await supabase
                .from("travels")
                .select("uuid")
                .eq("uuid", params.travel_uuid)
                .eq("user_id", user.id)
                .single();

            const isOrganizer = !!ownedTravel;

            const {data, error} = await supabase
            .from("participants")
            .insert([
            { travel_uuid: params.travel_uuid,
              user_id: user.id,
              organizer: isOrganizer,
              destination: params.destination,
              budget: params.slider,
              travel_pace: params.travel_pace,
              vibe: params.vibe,
              departure_date : params.departure_date,
              return_date : params.return_date
            }])
            .single();

        if (error) {
            return {data: null, error}
        }

        return {data, error: null}

    }
    catch(err) {
        console.log(err);

    }


}

export  async function signUp (user) { 
       try {

            const supabase  = await createSupabaseClient();

            const {error} = await supabase.auth.signUp({
                        email: user.email,
                        password: user.password,
                    })

            if (error) {
                
                return {errorMessage : error.code};           
            }
                    
            return {errorMessage : null};
       }
       catch(error) {
        console.log("errore:",error);
        
       }
    
}
export  async function logIn (user) { 
       try {

            const supabase  = await createSupabaseClient();

            const {error,data} = await supabase.auth.signInWithPassword({
                        email: user.email,
                        password: user.password,
                    })

             console.log(data);
                    

            if (error) {
                
                return {errorMessage : error.code};           
            }
                    
            return {errorMessage : null};
       }
       catch(error) {
        console.log("errore:",error);
        
       }
 
}

export async function getUsername(uuid) {
    try {
            const supabase  = await createSupabaseClient();
            const {error,data} = await supabase
            .from("users_data")
            .select()
            .eq('user_id', uuid)
            .single()
            console.log(error)


        if (error) {
            return {error: error}
        }        
        console.log(data);
        
        return {error : null,username : data}
        

    }
    catch(err) {
        console.log(err);
        
    }
    
}

export async function selectTravel(param) {
        try {       
                 
            const supabase  = await createSupabaseClient();
            const {data:newTravel, error} = await supabase
            .from("public_travel_info")
            .select()
            .eq('uuid', param)
            .single()

        if (error) {
            console.log(error);
            return {errorMessage: error}
            
            
        }       
        
        return { errorMessage: null, newTravel }; 
        

    }
    catch(err) {
        
    }
    
}

export async function getUserPreference(params) {
        
    try {
        const supabase = await createSupabaseClient();

        const { data: { user } } = await supabase.auth.getUser();
        
        console.log(user.id);
        
        

        const { data, error } = await supabase
            .from("participants")
            .select()
            .eq("user_id", user.id)
            
            console.log(data);
            
 

        return { data, error: null }
    }
    catch(err) {
        console.log(err);
    }

    
}

export async function getOrganizerQuizStatus() {
    const supabase = await createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Prendo tutti i viaggi creati dall'utente
    const { data: travels, error } = await supabase
        .from("travels")
        .select("uuid")
        .eq("user_id", user.id)

    

    if (error || !travels.length) return { pending: [], }

    // Per ognuno controllo se esiste già in participants
    const checks = await Promise.all(
        travels.map(async (t) => {
            const { data } = await supabase
                .from("participants")
                .select("user_id")
                .eq("travel_uuid", t.uuid)
                .eq("user_id", user.id)
                .single()
            return { travelUuid: t.uuid, hasFilled: !!data }
        })
    )

    const pending = checks.filter(c => !c.hasFilled).map(c => c.travelUuid)
    return { pending } // array di uuid senza quiz
}


export async function getParticipantStatus(travelUuid) {
    try {
        const supabase = await createSupabaseClient();

        const { data: { user } } = await supabase.auth.getUser();
        

        const { data, error } = await supabase
            .from("participants")
            .select()
            .eq("travel_uuid", travelUuid)
            .eq("user_id", user.id)
            .single();
            

        if (error && error.code !== "PGRST116") { // PGRST116 = no rows found, non è un errore reale
            return { hasPreferences: false, error }
        }

        return { hasPreferences: !!data, error: null }
    }
    catch(err) {
        console.log(err);
    }
}

export async function getUserData() {

    const supabase = await createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { travels: [], error: "Not authenticated" }

    // Query parallele: viaggi creati + viaggi dove ha inserito preferenze
    const [{ data: organizedTravels }, { data: participations }] = await Promise.all([
        supabase
            .from("travels")
            .select("uuid, name, number_of_travelers, status")
            .eq("user_id", user.id),
        supabase
            .from("participants")
            .select("travel_uuid")
            .eq("user_id", user.id)
    ])

    // Risalgo ai dettagli dei viaggi dove ha inserito preferenze
    const participantUuids = (participations || []).map(p => p.travel_uuid)
    let participantTravels = []
    if (participantUuids.length > 0) {
        const { data } = await supabase
            .from("travels")
            .select("uuid, name, number_of_travelers, status")
            .in("uuid", participantUuids)
        participantTravels = data || []
    }

    // Merge e deduplica (organizer che ha già compilato appare in entrambe le liste)
    const organizedUuids = new Set((organizedTravels || []).map(t => t.uuid))
    const merged = [
        ...(organizedTravels || []),
        ...participantTravels.filter(t => !organizedUuids.has(t.uuid))
    ]

    
    return { travels: merged, error: null }
}

export async function signOut() {
       try {

            const supabase  = await createSupabaseClient();

            const {error,data} = await supabase.auth.signOut()
            

            if (error) {
                console.log(error);
                
                
                return {errorMessage : error.code};           
            }
                    
            return {errorMessage : null};
       }
       catch(error) {
        console.log("errore:",error);
        
       }
    
}