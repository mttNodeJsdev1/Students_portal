"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  User,
  Briefcase,
  Book,
  FileText,
  ClipboardList,
  CreditCard,
  Gift,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function StudentSidebar() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isStudyDropdownOpen, setIsStudyDropdownOpen] = useState(false);
  const [isMockTestDropDownOpen, setIsMockTestDropDownOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setFormData({ data });
  }, []);
  return (
    <div
      className={`bg-sky-400 text-white fixed z-10 left-0 top-[60px] h-[calc(100vh-60px)] overflow-y-auto transition-all duration-300 ${
        isSidebarExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          className="p-2 text-white rounded-full"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        >
          {isSidebarExpanded ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center pb-4 border-b border-blue-300">
        <img
          src={formData?.data?.studentImg}
          alt="User"
          className="transition-all duration-300 rounded-full w-14 h-14"
        />
        {isSidebarExpanded && (
          <div className="mt-2 text-center">
            <h2 className="text-lg font-semibold">{formData?.data?.name}</h2>
            <p className="text-sm text-blue-200">Student</p>
          </div>
        )}
      </div>

      {/* Sidebar Menu */}
      <nav className="">
        <ul className="space-y-2">
          <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() => router.push("/profile")}
          >
            <User className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Profile</span>}
          </li>
          <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() => router.push("/sarkariJobs")}
          >
            <Briefcase className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Sarkari Jobs</span>}
          </li>

          <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() => router.push("/govt-admission")}
          >
            <Book className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Govt Admission</span>}
          </li>

          {/* Study Material with Dropdown */}
          <li>
            <div
              className="flex items-center px-4 py-3 h-full transition-all duration-200 cursor-pointer hover:bg-sky-400"
              onClick={() => setIsStudyDropdownOpen(!isStudyDropdownOpen)}
            >
              <FileText className="w-5 h-5" />
              {isSidebarExpanded && (
                <span className="flex-1 ml-4">Study Material</span>
              )}
              {isSidebarExpanded && (
                <span>{isStudyDropdownOpen ? "▲" : "▼"}</span>
              )}
            </div>

            {isStudyDropdownOpen && isSidebarExpanded && (
              <ul className="mt-2 space-y-2 text-sm text-white ml-15 ">
                <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() => router.push("/study-material/book")}
                >
                  » Book
                </li>
                <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() => router.push("/study-material/notes")}
                >
                  » Notes
                </li>

                <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() => router.push("/study-material/old-paper")}
                >
                  » Old Paper
                </li>

                <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() => router.push("/")}
                >
                  » Live Classes
                </li>
              </ul>
            )}
          </li>
          {/* <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() =>
              router.push("/dashboard/student-dashboard/mock-test")
            }
          >
            <ClipboardList className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Mock Test</span>}
          </li> */}

          <li>
            <div
              className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
              onClick={() => setIsMockTestDropDownOpen(!isMockTestDropDownOpen)}
            >
              <ClipboardList className="w-5 h-5" />
              {isSidebarExpanded && (
                <span className="flex-1 ml-4">Mock Test</span>
              )}
              {isSidebarExpanded && (
                <span>{isMockTestDropDownOpen ? "▲" : "▼"}</span>
              )}
            </div>
            {isMockTestDropDownOpen && isSidebarExpanded && (
              <ul className="mt-2 space-y-2 text-sm text-white ml-15">
                {/* <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() =>
                    router.push(
                      "/dashboard/student-dashboard/mock-test/short-hand"
                    )
                  }
                >
                  » Short Hand
                </li> */}
                <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() => router.push("/online-test")}
                >
                  » Online Test
                </li>
                <li
                  className="transition-all duration-300 transform cursor-pointer hover:text-blue-200 hover:translate-x-2"
                  onClick={() => router.push("/test-typing")}
                >
                  » Typing Test
                </li>
              </ul>
            )}
          </li>

          <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() => router.push("/refer-earn")}
          >
            <Users className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Refer & Earn</span>}
          </li>

          <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() => router.push("/best-wishes")}
          >
            <Gift className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Best Wishes</span>}
          </li>

          <li
            className="flex items-center px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-sky-400"
            onClick={() => router.push("/plan-management")}
          >
            <CreditCard className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-4">Plan Management</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
}
