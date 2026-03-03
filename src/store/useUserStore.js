import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

//https://zustand.docs.pmnd.rs/learn/getting-started/introduction
//https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data


export const useUserStore = create( //crea store persistente su localstorare
    persist(
        (set) => ({
            travelPrefences : {}, // lo setto vuoto all'inziio
            clearPreferences : () => set( ({travelPrefences: {}})),
            updatePreferences : (newPreferences) => set((state) => ({travelPrefences : {...state.travelPrefences,...newPreferences}}) //per mergare con dati precedenti passo lo state passato
            
            
            )


            

            
        }),
        {
            name: "travelPrefences", //nome nel local storage
        }
    )
)