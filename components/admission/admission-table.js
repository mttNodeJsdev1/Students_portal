"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiCircleFill } from "react-icons/ri";
import AdmissionFilter from "../filters/admission-filter";
import Category from "../category/job-category";
import { htmlToText } from "html-to-text";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Archive from "../archive/Archive";
import BookPreview from "../studey-material/BookPreview";
import NotesPreview from "../studey-material/NotesPreview";
const AdmissionTable = () => {
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

  // Scroll handler to load more data when reaching bottom
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
  }, [loading, hasMore]);

  // Fetch jobs when page changes
  useEffect(() => {
    const fetchJobs = async () => {
      if (loading || !hasMore) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://backend.indiasarkarinaukri.com/admission?page=${page}&limit=100`
        );

        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data

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
  }, [page, hasMore, loading]);

  // Filter jobs based on selected filters
  const handleFilter = (filters) => {
    const filtered = jobs.filter((job) => {
      const locationMatch = job?.State?.name
        ?.toLowerCase()
        .includes(filters?.location?.toLowerCase());
      const categoryMatch = job?.Category?.name
        ?.toLowerCase()
        .includes(filters?.category?.toLowerCase());
      const departmentMatch = job?.Depertment?.name
        ?.toLowerCase()
        .includes(filters.department?.toLowerCase());
      const contentMatch = job?.content
        ?.toLowerCase()
        .includes(filters.content?.toLowerCase());

      return locationMatch && categoryMatch && departmentMatch && contentMatch;
    });

    setFilteredData(filtered);
    console.log("Filtered data:", filtered); // Log filtered data
  };

  if (error && jobs.length === 0) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className=" text-black relative z-10 w-full p-2 mx-auto lg:py-4 sm:p-4">
        <h2 className="self-start w-full mb-4 text-3xl font-semibold text-center text-black">
          Government Admission
        </h2>
        <div className="flex flex-col gap-10">
          {/* Left Section */}
          <div className="w-full text-black ">
            <AdmissionFilter
              onApplyFilter={handleFilter}
              locations={locations}
              categories={categories}
              departments={departments}
              contentData={contentData}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:py-4 sm:p-4 p-2 w-[650px]">
            <div className="max-w-[1200px] relative p-6 text-white text-center border-red-800 rounded-tl-xl rounded-br-xl min-h-10 lg:text-lg text-xs lg:min-h-20 mt-4">
              <div className="absolute inset-0 flex items-center justify-start px-6 bg-sky-400">
                <h3 className="relative z-10 text-sm font-medium lg:text-xl lg:font-medium">
                  All Government Admission
                </h3>
              </div>
              <div className="absolute top-0 right-2 w-full h-2/4 bg-sky-400 transform skew-x-[-20deg]"></div>
              <div className="absolute bottom-0 right-2 w-full h-2/4 bg-sky-400 transform skew-x-[20deg]"></div>
              <div className="absolute top-0 left-2 w-full h-2/4 bg-sky-400 transform skew-x-[20deg] -rotate-180"></div>
              <div className="absolute bottom-0 left-2 w-full h-2/4 bg-sky-400 transform skew-x-[-20deg] -rotate-180"></div>
            </div>

            {/* Job List */}
            <div className="p-2 border border-[#247BFF] w-full">
              <ul className="space-y-3 text-xs lg:text-base">
                {filteredData.length > 0 ? (
                  filteredData.map((job, index) => (
                    <li
                      key={`${job.id}-${index}`}
                      className="flex items-center gap-2"
                    >
                      <RiCircleFill
                        size={6}
                        className="text-[#247BFF] flex-shrink-0"
                      />
                      <Link
                        href={`/dashboard/student-dashboard/govt-admission/${job.id}`}
                        className="text-linkcolor hover:underline font-[400]"
                      >
                        {job.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <div>No jobs found</div>
                )}
              </ul>
              {loading && (
                <div className="mt-2 text-center text-blue-500">
                  Loading more jobs...
                </div>
              )}
              {error && !loading && (
                <div className="mt-2 text-center text-red-500">{error}</div>
              )}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="w-full mt-5 space-y-4 lg:w-1/3">
            <Category />
            <Archive />
            <BookPreview />
            <NotesPreview />
          </div>
        </div>

        {/* Scroll to top and bottom buttons */}
        <div className="fixed z-50 flex gap-3 bottom-5 right-5">
          <button
            onClick={scrollToTop}
            className="p-3 text-white transition duration-300 bg-sky-400 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
          >
            <FaArrowUp size={17} />
          </button>

          <button
            onClick={scrollToBottom}
            className="p-3 text-white transition duration-300 bg-sky-400 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
          >
            <FaArrowDown size={17} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdmissionTable;
