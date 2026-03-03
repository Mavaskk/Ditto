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
            const supabase  = await createSupabaseClient();
            const {data, error} = await supabase
            .from("participants")
            .insert([
            { travel_uuid: params.travel_uuid ,
              destination: params.destination,
              budget: params.slider,
              travel_pace: params.travel_pace,
              vibe: params.vibe,



               
            }])
            .single();    // <--- Dici a Supabase che ti aspetti un solo oggetto

            
        if (error) {
            return {data: null, error: err} 
        }    

        return {data,error}
        
         
    
        

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
            console.log(param);
                 
            const supabase  = await createSupabaseClient();
            const {data:newTravel, error} = await supabase
            .from("public_travel_info")
            .select()
            .eq('uuid', "04d2bd03-336f-4365-8dd8-db85fd406a5d")
            .single()

        if (error) {
            console.log(error);
            return {errorMessage: error}
            
            
        }       
        console.log("sdsa");
        
        return { errorMessage: null, newTravel }; 
        

    }
    catch(err) {
        
    }
    
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