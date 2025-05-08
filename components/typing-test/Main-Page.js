"use client";

import { useRouter } from "next/navigation";
import React from "react";

const PracticeTestCards = () => {
  const router = useRouter();

  const handleStartPracticeTest = () => {
    router.push("/test-typing/practice-test");
  };

  const handleStartTest = () => {
    router.push("/test-typing/typing-test");
  };
  return (
    <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 mt-10 ml-10 p-5 ">
      {/* Practice Card */}
      <div className="bg-white border-blue-950 shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition flex flex-col justify-between items-center">
        {/* <div className="w-full h-[200px] border border-blue-300 bg-sky-400 p-4 rounded-lg flex flex-col items-center gap-15"> */}
        {/* <h2 className="text-2xl text-white font-semibold">Practice Mode</h2> */}
        <button
          onClick={handleStartPracticeTest}
          className="bg-blue-950  border-white text-white px-6 py-2 w-[9rem]  rounded hover:bg-blue-900 transition cursor-pointer"
        >
          Start Practice
        </button>
        {/* </div> */}
      </div>
      {/* Test Card */}
      <div className=" bg-white border-sky-950 text-center shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition flex flex-col justify-between items-center">
        {/* <div className="w-full h-[200px] border border-blue-300 bg-sky-400 p-4 rounded-lg flex flex-col items-center gap-15"> */}
        <button
          onClick={handleStartTest}
          target="_blank"
          className="bg-blue-950  border-white flex text-white text-center justify-center w-[9rem] p-2 h-[40px] rounded hover:bg-blue-900 transition cursor-pointer"
        >
          Start Test
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PracticeTestCards;
