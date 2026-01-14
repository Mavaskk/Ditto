import { Lora, Lato } from "next/font/google";
import "./globals.css";
import 'flowbite';


// Configurazione Font come da tuo codice
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Aggiunti pesi per il grassetto
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata = {
  title: "Travel App",
  description: "Group travel without the drama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${lato.variable}  antialiased relative min-h-screen overflow-x-hidden bg-white`}>
        
        {/* --- BACKGROUND LAYER --- */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          
          {/* 1. Il Bagliore Verde Principale (Top-Right) 
              - Desktop: Grande, in alto a destra.
              - Mobile: Copre quasi tutta la parte superiore.
          */}
          <div className="
            absolute 
            top-[-10%] right-[-10%] md:-right-30 md:top-[-30%]
            w-[120%] md:w-[70%] 
            h-[40vh] md:h-[80vh]
            rounded-full 
            bg-[#76CB08] /* Il verde lime dello screenshot */
            blur-[60px] md:blur-[100px] /* Sfocatura estrema per l'effetto gradiente */
            opacity-70 md:opacity-60
          "></div>

          {/* 2. Un tocco di giallo/crema (Top-Left/Center) per scaldare la luce */}
          <div className="
            absolute 
            -top-20 left-[-10%] md:left-[-5%]
            w-[80%] md:w-[70%] 
            h-[40vh] md:h-[60vh]
            rounded-full 
            bg-[#FDF2B9] 
            blur-[50px] md:blur-[100px]
            opacity-60
          "></div>
        </div>

        {children}
      </body>
    </html>
  );
}