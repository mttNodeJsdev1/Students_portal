"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Archive = () => {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArchives = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://backend.indiasarkarinaukri.com/archive/job/existing-years-and-months"
        );
        const data = await response.json();

        // Sorting data so that latest months appear first
        const sortedData = data.sort(
          (a, b) => b.year - a.year || b.month - a.month
        );

        setArchives(sortedData);
      } catch (error) {
        console.error("Error fetching archive data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, []);

  // Function to convert month number to month name
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  };

  return (
    <div className="lg:py-4 sm:p-4 p-2">
      <div className="relative p-6 text-white text-center border-red-800 rounded-tl-xl rounded-br-xl min-h-10 lg:text-lg text-xs lg:min-h-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="relative text-sm font-medium z-10 lg:text-xl lg:font-medium">
            Archive
          </h3>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2/4 bg-sky-400 transform skew-x-[20deg]"></div>
        <div className="absolute bottom-0 left-0 w-full h-2/4 bg-sky-400 transform skew-x-[-20deg]"></div>
      </div>
      <div className="p-2 border border-[#247BFF] w-full relative right-1">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {archives.length > 0 ? (
              archives.map((archive, index) => (
                <li key={index}>
                  <Link
                    href={`/archive/${archive.year}/${archive.month}`}
                    className="text-blue-600 hover:underline"
                  >
                    {getMonthName(archive.month)} {archive.year}
                  </Link>
                </li>
              ))
            ) : (
              <li>No archives found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Archive;
