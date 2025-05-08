"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaQuestionCircle,
  FaClock,
  FaCheckCircle,
  FaMinusCircle,
} from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
export default function OnlineTestCard() {
  const [resData, setResData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("submittedTest"));
    setResData(data);
  }, []);
  console.log(resData?.status);

  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch(
          "https://backend.indiasarkarinaukri.com/mock-test/test"
        );
        const data = await res.json();

        if (data?.data?.rows && Array.isArray(data.data.rows)) {
          setTests(data.data.rows);
        } else {
          setTests([]);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const openTestInNewWindow = (test) => {
    const url = `/online-test/${test.id}`;
    window.open(
      url,
      "_blank",
      "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1000,height=800"
    );
  };

  const filteredTests = tests.filter((test) =>
    test.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between flex-wrap">
        <h1 className="text-3xl font-semibold text-[#42b8d4] mb-6">
          Online Test
        </h1>
        <div className="flex justify-end mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-70 ml-40 rounded-lg border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#42b8d4]"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTests.length === 0 ? (
          <p className="text-gray-600 col-span-full">No tests found.</p>
        ) : (
          filteredTests.map((test, index) => (
            <div
              key={test.id || index}
              className="border border-[#b3e5fc] rounded-xl shadow-sm p-2 w-full hover:shadow-md transition"
            >
              <div className="flex">
                <h2 className="text-lg font-semibold text-[#001F5B] truncate">
                  {test.title || "Untitled Test"}
                </h2>

                {/* <button
                  className="w-20 h-6 font-bold ml-5 mt-2 cursor-pointer bg-blue-500 text-white text-xs rounded-full flex items-center justify-center"
                  onClick={handleClick}
                >
                  Check Rank
                </button> */}
              </div>
              {/* <OverAllRank className="w-2 h-2 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center" /> */}

              <p className="text-sm text-gray-700 mb-4 w-[200px] ">
                <span>{test.startDate || "N/A"}</span>
                {/* <span> {test.endDate || "N/A"}</span> */}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaQuestionCircle className="text-[#42b8d4] mr-2" />
                  {test.totalQuestions ?? 0} Questions
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-[#42b8d4] mr-2" />
                  {test.totalMarks ?? 0} Marks
                </div>
                <div className="flex items-center">
                  <FaClock className="text-[#42b8d4] mr-2" />
                  {test.duration ?? 0} Min
                </div>
                <div className="flex items-center">
                  <FaMinusCircle className="text-[#42b8d4] mr-2" />
                  {test.negativeMarks ?? 0} Negative
                </div>
              </div>

              <p className="text-[#001F5B] font-semibold text-lg mt-4">Free</p>

              <div className="flex justify-between mt-4 ">
                {resData?.status === "submitted" && resData.test_id && (
                  <button
                    onClick={() =>
                      router.push(`/online-test/Analysis/${test.id}`)
                    }
                    className="bg-[#001F5B] cursor-pointer  text-white flex items-center gap-2 rounded-md p-[5px] text-sm hover:opacity-90"
                  >
                    <IoAnalytics />
                    Analysis
                  </button>
                )}
                <button
                  onClick={() => openTestInNewWindow(test)}
                  className="bg-[#001F5B]  cursor-pointer text-white rounded-md px-4 py-2 text-sm hover:opacity-90"
                >
                  Start Test
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
