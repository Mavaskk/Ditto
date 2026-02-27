"use client"
import { motion } from "framer-motion"
import styles from "./TabNav.module.css"

export default function TabNav({ liTab, value, onChange }) {
    return (
        <nav className="w-full flex justify-center">
            <motion.ul className="flex flex-row bg-white items-center gap-3 border border-gray-200 px-5 py-2 rounded-3xl">
                {liTab.map((tab) => {
                    // Adesso il controllo è sul valore del form, non sul pathname
                    const isActive = value === tab.id; 

                    return (
                        <motion.li
                            key={tab.id}
                            onClick={() => onChange(tab.id)} // Comunica al form il cambiamento
                            className={`relative px-4 py-1 cursor-pointer transition-colors duration-300 ${
                                isActive ? "text-white" : "text-gray-500"
                            }`}
                        >
                            <span className="relative z-10">{tab.name}</span>

                            {isActive && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-[#ECFDB9]  rounded-xl z-0"
                                />
                            )}
                        </motion.li>
                    );
                })}
            </motion.ul>
        </nav>
    );
}