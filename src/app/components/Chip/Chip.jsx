"use client";
import { useState } from "react";

export default function Chip({ label, selected = false, onClick, variant = "outline" }) {
  const baseStyles = "px-4 py-2 rounded-full font-medium cursor-pointer transition-all";
  
  const variants = {
    outline: selected 
      ? "bg-[#ECFDB9] text-[#375D06] border-2 border-[#375D06]"
      : "bg-white text-gray-700 border-2 border-gray-300 hover:border-[#375D06]",
    solid: selected
      ? "bg-[#375D06] text-[#ECFDB9]"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  };

  return (
    <button
    type="button"
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}