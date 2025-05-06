"use client";

import { useRouter } from "next/navigation";
import React from "react";

const PracticeTestCards = () => {
  const router = useRouter();

  const handleStartPractice = () => {
    router.push("/practice-test");
  };

  const handleStartTest = () => {
    router.push("/typing-test");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-20 p-20">
      {/* Practice Card */}
      <div className="bg-white border-blue-950 shadow-lg rounded-2xl p-6 w-[300px] h-[260px] border hover:shadow-2xl transition flex flex-col justify-between items-center">
        <div className="w-full h-[200px] border border-blue-300 bg-sky-400 p-4 rounded-lg flex flex-col items-center gap-15">
          <h2 className="text-2xl text-white font-semibold">Practice Mode</h2>
          <button
            onClick={handleStartPractice}
            className="bg-blue-950 border-white text-white px-6 py-2 rounded hover:bg-blue-900 transition cursor-pointer"
          >
            Start Practice
          </button>
        </div>
      </div>
      {/* Test Card */}
      <div className=" bg-white border-sky-950 shadow-lg rounded-2xl p-6 w-[300px] h-[260px] border hover:shadow-2xl transition flex flex-col justify-between items-center">
        <div className="w-full h-[200px] border border-blue-300 bg-sky-400 p-4 rounded-lg flex flex-col items-center gap-15">
          <h2 className="text-2xl text-white font-semibold">Test Mode</h2>
          <button
            onClick={handleStartTest}
            className="bg-blue-950 border-white text-white px-9 py-2 h-[40px] rounded hover:bg-blue-900 transition cursor-pointer"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeTestCards;
