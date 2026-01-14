import Image from "next/image";

// Assicurati che questi percorsi siano corretti nel tuo progetto!
// Se non hai ancora le immagini, commenta gli import e usa stringhe vuote temporanee.
import debatesSvg from "../../../assets/debates.svg";
import lostChatSvg from "../../../assets/lostChat.svg";
import planningSvg from "../../../assets/planning.svg";

const cards = [
  {
    id: 0,
    title: "Endless Debates",
    description: `When "maybe next summer" turns into never.`,
    svg: debatesSvg,
    theme: "purple",
  },
  {
    id: 1,
    title: "Lost in the Chat",
    description: `300 unread messages, zero decisions made.`,
    svg: lostChatSvg,
    theme: "orange",
  },
  {
    id: 2,
    title: "The Planning Headache",
    description: `Being the "admin" shouldn't feel like a full-time job.`,
    svg: planningSvg,
    theme: "green",
  },
];

export default function CardLanding({size }) {
  
  const getStyles = (theme) => {
    switch (theme) {
      case "purple":
        return { wrapper: "bg-[#F9DBFF] z-1 shadow-[0_0_20px_1px_rgba(0,0,0,0.12)] bg-[#F3FDD8] rotate-[-2.593deg]", title: "text-[#6A1B9A]", text: "text-[#4A148C]" };
      case "orange":
        return { wrapper: "bg-[#FFF7E0] z-10 shadow-[0_0_20px_1px_rgba(0,0,0,0.12)] bg-[#F3FDD8]", title: "text-[#BF360C]", text: "text-[#BF360C]" };
      case "green":
        return { wrapper: "bg-[#F3FDD8] z-1 shadow-[0_0_20px_1px_rgba(0,0,0,0.12)] bg-[#F3FDD8] rotate-[2.59deg]", title: "text-[#33691E]", text: "text-[#1B5E20]" };
    }
  };

  if (size === "mobile") {
    return (
        // Usa flex-row per metterle in fila orizzontale, pronte per il carosello
        <div className={`flex  flex-row items-center gap-8  `}>
        {cards.map((card) => {
            const styles = getStyles(card.theme);

            return (
            <div
                key={card.id}
                className={`
                    my-5
                    flex-shrink-0 
                    w-[280px] h-[320px] 
                    rounded-3xl p-6 
                    flex flex-col items-center justify-between 
                    ${styles.wrapper}
                `}
            >
                <h2 className={`font-bold text-center text-xl ${styles.title}`}>
                {card.title}
                </h2>

                <div className="w-full flex justify-center items-center flex-1">
                <div className="relative w-32 h-32">
                    {/* Controllo di sicurezza se l'immagine non è ancora stata importata */}
                    {card.svg && (
                        <Image 
                            src={card.svg} 
                            alt={card.title}
                            fill
                            className="object-contain"
                        />
                    )}
                </div>
                </div>

                <p className={`text-center text-sm font-medium ${styles.text}`}>
                {card.description}
                </p>
            </div>
            );
        })}
        </div>
    );



  }

  return (

            <div className={`flex flex-row items-center   `}>
        {cards.map((card) => {
            const styles = getStyles(card.theme);

            return (
            <div
                key={card.id}
                className={`
                    my-5
                    flex-shrink-0 
                    md:w-[280px] md:h-[320px]
                    lg:w-[320px] lg:h-[400px] 
                    rounded-3xl p-10 
                    flex flex-col items-center justify-between 
                    ${styles.wrapper}
                `}
            >
                <h2 className={`font-bold text-center md:text-xl lg:text-2xl ${styles.title}`}>
                {card.title}
                </h2>

                <div className="w-full flex justify-center items-center flex-1">
                <div className="relative w-32 h-32 lg:w-55 lg:h-55">
                    {/* Controllo di sicurezza se l'immagine non è ancora stata importata */}
                    {card.svg && (
                        <Image 
                            src={card.svg} 
                            alt={card.title}
                            fill
                            className="object-contain"
                        />
                    )}
                </div>
                </div>

                <p className={`text-center md:text-sm lg:text-md font-medium ${styles.text}`}>
                {card.description}
                </p>
            </div>
            );
        })}
        </div>

    



  )


}