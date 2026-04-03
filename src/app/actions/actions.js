"use server"
import { createSupabaseClient } from "@/app/auth/server";
import { Mistral } from '@mistralai/mistralai';



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
        
        return { errorMessage: null, participants }; 
    }

    catch (err) {
        console.log(err);
        
        
    }

}

export async function checkNumberOfPreferencesByTravelUid(travelUid) {
        try {
        const supabase = await createSupabaseClient();

        
        

        const { data, error } = await supabase
            .from("public_participants_info")
            .select()
            .eq("travel_uuid", travelUid)
            

        
            
 

        return { numberOfPartecipants: data.length, error: null }
    }
    catch(err) {
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
        
        
        

        const { data, error } = await supabase
            .from("participants")
            .select()
            .eq("user_id", user.id)
            
            
 

        return { data, error: null }
    }
    catch(err) {
        console.log(err);
    }

    
}

export async function getUserTravelContext(travelUid) {
    const supabase = await createSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "unauthenticated" }

    // 1. Controllo se utente ha creato un viaggio
    const { data: travel } = await supabase
        .from("travels")
        .select("uuid,number_of_travelers")
        .eq("user_id", user.id)
        .eq("uuid", travelUid)
        .maybeSingle() // null senza errore se non trovato
        
        

    if (travel) {
        const {numberOfPartecipants} = await checkNumberOfPreferencesByTravelUid(travel.uuid) //se organizzatore controllo quante preferenze sono aggiunte
        // È un organizzatore — controllo se ha già le preferenze
        const { data: preferences } = await supabase
            .from("participants")
            .select()
            .eq("travel_uuid", travel.uuid)
            .eq("user_id", user.id)
            .maybeSingle()

        

        if (preferences) {
            return { isOrganizer: true, hasPreferences: true, preferences, numberOfPartecipants: numberOfPartecipants, maxParticipantsNumber : travel.number_of_travelers }
        } else {
            // Ha creato il viaggio ma non ha ancora compilato il quiz
            return { isOrganizer: true, hasPreferences: false, travelUuid: travel.uuid }
        }
    }

    // 2. Non ha creato viaggi — controllo se è partecipante invitato
    const { data: preferences } = await supabase
        .from("participants")
        .select()
        .eq("user_id", user.id)
        .maybeSingle()

    

    if (preferences) {
        return { isOrganizer: false, hasPreferences: true, preferences }
    }

    // 3. Nessun viaggio, nessuna preferenza
    return { isOrganizer: false, hasPreferences: false }
}

export async function createAiSuggestion(params) {

    const { z } = await import('zod');
    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new Mistral({ apiKey });

    const TravelSuggestion = z.object({
        destination: z.string().describe("Destinazione suggerita del viaggio"),
        duration_days: z.number().describe("Durata del viaggio in giorni"),
        daily_sketch: z.array(z.string()).describe("Scheletro giornaliero del viaggio, un elemento per giorno"),
        compromise_notes: z.string().describe("Motivazione dei compromessi fatti tra le preferenze"),
        affinity_score: z.number().min(0).max(10).describe("Punteggio di affinità del viaggio rispetto alle preferenze, da 0 a 10"),
    });

    const chatResponse = await client.chat.parse({
        model: 'mistral-small-latest',
        messages: [
            {
                role: 'system',
                content: 'Sei un esperto di viaggi di gruppo. Genera suggerimenti di viaggio strutturati basandoti sulle preferenze fornite.'
            },
            {
                role: 'user',
                content: `Voglio organizzare una vacanza tra amici e queste sono le nostre preferenze: ${JSON.stringify(params, null, 2)}.
                Genera un unico viaggio che assecondi il più possibile le preferenze di tutti, trovando compromessi motivati dove necessario.
                Pensa solo a uno scheletro dei giorni senza entrare nel dettaglio.
                Assegna un punteggio di affinità da 0 a 10.`
            }
        ],
        responseFormat: TravelSuggestion,
    });

    console.log(chatResponse.choices[0].message.parsed );
    
    return { response: chatResponse.choices[0].message.parsed }
}

export async function insertAiSuggestion(params) {
    
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

export async function getPreferencesByTravelUuid(travelUuid) {

    try {
        const supabase = await createSupabaseClient();

        

        const { data, error } = await supabase
            .from("participants")
            .select()
            .eq("travel_uuid", travelUuid)
            .select(`
                destination,
                budget,
                travel_pace,
                vibe,
                departure_date,
                return_date`)
            

        if (error && error.code !== "PGRST116") { // PGRST116 = no rows found, non è un errore reale
            return { hasPreferences: false, error }
        }
        
        
        
        return { preferences: data, error: null }
    }
    catch(err) {
        console.log(err);
    }
    
}

export async function getTravelData(params) {
    const supabase = await createSupabaseClient()

    // Prendo tutti i viaggi creati dall'utente
    
    try {
        const { data: travel, error } = await supabase
                .from("public_travel_info")
                .select()
                .eq("uuid", params) 
                .single() 
    

                return {travel : travel}

                

            }
    catch (err){
        console.error(err);
        
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
            .from("public_travel_info")
            .select("uuid, name, number_of_travelers")
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