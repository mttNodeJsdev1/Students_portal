"use client";
import { Search, Notifications, Logout, Menu } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
export default function StudentNavbar() {
  const router = useRouter();
  const handelLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    router.replace("/login");
  };
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-between w-full p-3 px-4 bg-white shadow-md md:px-6">
      {/* Logo & Title */}
      <div className="flex items-center space-x-3">
        <Image
          src="/images/logo.png"
          alt="Logo"
          className="h-8 md:h-10"
          width={50}
          height={60}
        />
        <div className="flex flex-col leading-none">
          <h1 className="text-[#1A325D] text-lg md:text-xl font-bold">
            India Sarkari Naukri
          </h1>
          <h6 className="text-[#1995BD] text-xs md:text-sm self-start">
            Sarkari Naukri Website
          </h6>
        </div>
      </div>
      {/* Desktop Actions */}
      <div className="items-center space-x-6 md:flex">
        <div className="px-4 py-1 text-lg text-gray-800 border-2 border-blue-400 rounded-2xl">
          Current Plan: <strong>Free</strong>
        </div>
        <button className="px-4 py-1 text-white bg-red-500 rounded-sm hover:bg-red-600">
          Upgrade
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 pl-10 placeholder-gray-500 border-2 border-blue-400 rounded-full w-60 focus:outline-blue-500"
          />
          <Search className="absolute w-5 h-5 text-blue-500 top-2 left-3" />
        </div>
        <button className="relative p-3 bg-blue-100 rounded-full hover:bg-blue-200">
          <Notifications className="w-6 h-6 text-blue-600" />
          <span className="absolute px-1 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
            3
          </span>
        </button>
        <button
          className="flex items-center gap-2 px-5 py-2 text-white rounded-sm cursor-pointer bg-sky-400 hover:bg-blue-700"
          onClick={handelLogout}
        >
          <Logout className="w-5 h-5" fontSize="small" />
          Logout
        </button>
      </div>
    </div>
  );
}
