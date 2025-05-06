"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Header() {
  const [formData, setFormData] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setFormData(data);
  }, []);
  console.log("Hello", formData);
  return (
    <div className="relative flex items-center justify-between w-full px-6 py-3 mr-30 bg-sky-400 ">
      <h1 className="absolute mr-10 text-xl font-semibold text-white transform -translate-x-1/2 left-1/2">
        Typing Test
      </h1>
      <div className="flex items-center gap-3 ml-auto">
        <img
          src={formData?.studentImg}
          alt="User"
          className="object-cover w-10 h-10 border-2 border-white rounded-full"
          width={100}
          height={100}
        />
        <h2 className="font-medium text-white">{formData?.name}</h2>
      </div>
    </div>
  );
}
