"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RiCircleFill } from "react-icons/ri";
import { htmlToText } from "html-to-text";
import Archive from "../archive/Archive";
import Category from "../category/job-category";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import JobFilters from "../filters/job-filter";
import BookPreview from "../studey-material/BookPreview";
import NotesPreview from "../studey-material/NotesPreview";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const categories = Array.from(
    new Set(jobs?.map((job) => job.Category?.name || ""))
  );
  const departments = Array.from(
    new Set(jobs?.map((job) => job.Depertment?.name || ""))
  );
  const locations = Array.from(
    new Set(jobs?.map((job) => job.State?.name || ""))
  );
  const contentData = jobs?.map((contentItem) =>
    htmlToText(contentItem.content, {
      wordwrap: 130,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    })
  );

  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]); // Added loading and hasMore here

  // Fetch data when page changes
  useEffect(() => {
    const fetchJobs = async () => {
      if (loading || !hasMore) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://backend.indiasarkarinaukri.com/job?page=${page}&limit=10`
        );
        if (!response.ok) throw new Error("failed to fetch jobs");
        const data = await response.json();
        if (data?.rows?.length > 0) {
          setJobs((prev) => [...prev, ...data.rows]);
          setFilteredData((prev) => [...prev, ...data.rows]);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  const handleFilter = (filters) => {
    const filtered = jobs.filter((job) => {
      const locationMatch = job?.State?.name
        ?.toLowerCase()
        .includes(filters?.location?.toLowerCase());
      console.log("locationmatch", locationMatch);

      const categoryMatch = job?.Category?.name
        ?.toLowerCase()
        .includes(filters?.category?.toLowerCase());
      console.log("category", categoryMatch);

      const departmentMatch = job?.Depertment?.name
        ?.toLowerCase()
        .includes(filters.department?.toLowerCase());

      const contentMatch = job?.content
        ?.toLowerCase()
        .includes(filters.content?.toLowerCase());

      // Salary
      const salaryMatch = job["content"].match(/rs\.?\s*([\d,]+)/i);
      const numericSalary = salaryMatch
        ? Number(salaryMatch[1].replace(/,/g, ""))
        : null;
      const salaryInRange =
        numericSalary &&
        filters.salary >= numericSalary &&
        filters.salary <= numericSalary;

      // Age
      const ageMatch = job["content"].match(/(\d{1,2})\s*years?/i);
      const ageInRange =
        ageMatch &&
        filters.age >= Number(ageMatch[1]) &&
        filters.age <= Number(ageMatch[1]);

      const exprienceMatch = job["content"].match(
        /exprience\s*=\s*(\d+)-(\d+)/
      );
      const exprienceInRange =
        exprienceMatch &&
        filters.exprience >= Number(exprienceMatch[1]) &&
        filters.exprience <= Number(exprienceMatch[2]);

      const salaryRangeValid = filters.salary ? salaryInRange : true;
      const ageRangeValid = filters.age ? ageInRange : true;
      const exprienceRangeValid = filters.exprience ? exprienceInRange : true;
      return (
        locationMatch &&
        categoryMatch &&
        departmentMatch &&
        contentMatch &&
        salaryRangeValid &&
        ageRangeValid &&
        exprienceRangeValid
      );
    });

    setFilteredData(filtered);
    console.log(
      "Hello",
      filteredData.map((job) => job.id)
    );
  };

  if (error && jobs.length === 0) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className=" text-black relative z-10 w-full p-2 mx-auto lg:py-4 sm:p-4">
        <h2 className="self-start w-full mb-4 text-3xl font-semibold text-center text-black">
          Sarkari Jobs
        </h2>
        <div className="flex flex-col gap-10 ">
          {/* Left Section */}
          <div className="  text-black w-full ">
            <JobFilters
              onApplyFilter={handleFilter}
              locations={locations}
              categories={categories}
              departments={departments}
              contentData={contentData}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:py-4 sm:p-4 p-2 w-[650px]">
            <div className=" max-w-[1200px] relative p-6 text-white text-center border-red-800 rounded-tl-xl rounded-br-xl min-h-10 lg:text-lg text-xs lg:min-h-20 mt-4">
              <div className="absolute inset-0 flex items-center justify-start px-6 bg-blue-500">
                <h3 className="relative z-10 text-sm font-medium lg:text-xl lg:font-medium">
                  All Government Jobs
                </h3>
              </div>
              <div className="absolute top-0 right-2 w-full h-2/4 bg-blue-500 transform skew-x-[-20deg]"></div>
              <div className="absolute bottom-0 right-2 w-full h-2/4 bg-blue-500 transform skew-x-[20deg]"></div>
              <div className="absolute top-0 left-2 w-full h-2/4 bg-blue-500 transform skew-x-[20deg] -rotate-180"></div>
              <div className="absolute bottom-0 left-2 w-full h-2/4 bg-blue-500 transform skew-x-[-20deg] -rotate-180"></div>
            </div>

            {/* Job List */}
            <div className="p-2 border border-[#247BFF] w-full">
              <ul className="space-y-3 text-xs lg:text-base">
                {filteredData.map((job, index) => (
                  <li
                    key={`${job.id}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <RiCircleFill
                      size={6}
                      className="text-[#247BFF] flex-shrink-0"
                    />
                    <Link
                      href={`/sarkariJobs/${job.id}`}
                      className="text-linkcolor hover:underline font-[400]"
                    >
                      {job.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {loading && (
                <>
                  {jobs.length < 100 ? (
                    <div className="mt-2 text-center text-blue-500">
                      Loading more jobs...
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="p-4 space-y-2 border border-gray-200 rounded-lg shadow animate-pulse"
                        >
                          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {error && !loading && (
                <div className="mt-2 text-center text-red-500">{error}</div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full mt-5 space-y-4 lg:w-1/3">
            <Category />
            <Archive />
            <BookPreview />
            <NotesPreview />
          </div>
        </div>

        <div className="fixed z-50 flex gap-3 bottom-5 right-5">
          <button
            onClick={scrollToTop}
            className="p-3 text-white transition duration-300 bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
          >
            <FaArrowUp size={17} />
          </button>

          <button
            onClick={scrollToBottom}
            className="p-3 text-white transition duration-300 bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
          >
            <FaArrowDown size={17} />
          </button>
        </div>
      </div>
    </>
  );
};

export default JobTable;
