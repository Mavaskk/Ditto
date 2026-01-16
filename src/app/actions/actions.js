"use server"
import { createSupabaseClient } from "@/app/auth/server";


export async function addUsername(username) {
    try {
            const supabase  = await createSupabaseClient();
            const {error} = await supabase
            .from("users_data")
            .insert([
            { username: username , //trasformo in stringa json
               
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