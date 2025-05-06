"use client";

import Link from "next/link";

export default function BookTeaser() {
  return (
    <div className="border border-gray-300 w-72 max-w-sm mx-auto rounded-sm overflow-hidden shadow absolute top-10 left-[790px]">
      {/* Header */}
      <div className="bg-blue-500 text-white text-center font-semibold py-2">
        Free Books
      </div>

      {/* View More */}
      <div className="text-center  py-8 bg-white">
        <Link
          href="/dashboard/student-dashboard/study-material/book"
          className="text-black mt-4 float-end p-2 font-semibold hover:underline text-sm"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
