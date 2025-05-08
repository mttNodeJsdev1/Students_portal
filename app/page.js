import JobTable from "@/components/jobs/JobTable";
import StudentNavbar from "@/components/studentnavbar/Navbar";
import StudentSidebar from "@/components/studentnavbar/Sidebar";

export default function Home() {
  return (
    <>
      <div>
        <StudentNavbar />
        <StudentSidebar />
        <div className=" mt-20 ml-62 p-3 mr-2">
          <JobTable />
        </div>
      </div>
    </>
  );
}
