"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { languages, passages, timeOptions } from "./Mockdata";
import Header from "./Header";
export default function TypingPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedPassageId, setSelectedPassageId] = useState(
    passages[languages[0]][0].id
  );
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);

  const handleStartTest = () => {
    const query = new URLSearchParams({
      language: selectedLanguage,
      passageId: selectedPassageId,
      time: selectedTime,
    }).toString();

    router.push(`/practice-test/start-test?${query}`);
  };
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center flex-1 h-full   relative z-10">
        <div className="w-full max-w-md p-8 mb-10 bg-white rounded-lg shadow-lg mt-7">
          <div className="py-3 mb-6 text-center text-white bg-sky-400 rounded-md">
            <h2 className="text-lg italic font-semibold">
              Typing Training Test
            </h2>
          </div>
          <div className="space-y-4">
            {/* Select Language */}
            <div className="flex gap">
              <label className="block mb-1 font-medium">
                Select Language :
              </label>
              <select
                className="w-[250px] p-1 ml-1 border rounded-md shadow-sm"
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setSelectedPassageId(passages[e.target.value][0].id);
                }}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Passage */}
            <div className="flex gap-5">
              <label className="block mb-1 font-medium">Select Passage :</label>
              <select
                className="w-[250px] p-1 border rounded-md shadow-sm"
                value={selectedPassageId}
                onChange={(e) => setSelectedPassageId(e.target.value)}
              >
                {passages[selectedLanguage].map((passage) => (
                  <option key={passage.id} value={passage.id}>
                    {passage.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Time */}
            <div className="flex gap-10">
              <label className="block mb-1 font-medium">Select Time :</label>
              <select
                className="w-[250px] p-1 border rounded-md shadow-sm"
                value={selectedTime}
                onChange={(e) => setSelectedTime(parseInt(e.target.value))}
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time / 60} Min
                  </option>
                ))}
              </select>
            </div>

            {/* Start Test Button */}
            <div className="flex justify-center">
              <button
                onClick={handleStartTest}
                className="w-[100px] mt-4 cursor-pointer  bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
