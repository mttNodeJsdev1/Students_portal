"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // import useRouter
import StudentNavbar from "@/components/studentnavbar/Navbar";
import StudentSidebar from "@/components/studentnavbar/Sidebar";

export default function StudentDashboard({ children }) {
  const router = useRouter(); // Initialize router
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Use router.push()
    }
  }, [router]); // Add router to dependencies

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navbar */}
      <StudentNavbar />

      {/* Sidebar + Content */}
      <div className="flex flex-grow pt-14">
        <StudentSidebar />

        {/* Main Content */}
        <div className="flex-grow p-6 ml-20 transition-all duration-300">
          {/* Background bubbles */}
          <div
            className="fixed p-4 -top-8 rotate-14 left-52"
            style={{
              backgroundImage: `url('/images/Ellipse3.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "320px",
              height: "320px",
            }}
          ></div>

          <div
            className="fixed top-1/2 left-[800px] transform -translate-x-1/2 -translate-y-1/2 p-4"
            style={{
              backgroundImage: `url('/images/Ellipse2.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "350px",
              height: "350px",
            }}
          ></div>

          <div
            className="fixed right-0 p-4 -bottom-6"
            style={{
              backgroundImage: `url('/images/Ellipse1.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "200px",
              height: "200px",
            }}
          ></div>
          <div className="ml-35">{children}</div>
        </div>
      </div>
    </div>
  );
}
