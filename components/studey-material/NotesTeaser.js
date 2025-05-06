// components/notes/NotesTeaser.js
"use client";
import Link from "next/link";

export default function NotesTeaser() {
  return (
    <div className="border mt-40 border-gray-300 w-72 max-w-sm mx-auto rounded-sm overflow-hidden shadow absolute top-10 left-[790px]">
      <div className="bg-blue-500 text-white text-center font-semibold py-2">
        Free Books
      </div>
      <div className="text-center  py-8 bg-white">
        <Link
          href="/dashboard/student-dashboard/study-material/notes"
          className="text-black mt-4 float-end p-2 font-semibold hover:underline text-sm"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
