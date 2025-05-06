"use client";
import Image from "next/image"; // Import Image from next/image

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { IoMdShare } from "react-icons/io";
import BookTeaser from "@/components/studey-material/BookTeaser";
import NotesTeaser from "@/components/studey-material/NotesTeaser";

const JobDetails = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://backend.indiasarkarinaukri.com/job/${slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const shareUrl = `https://indiasarkarinaukri.com/dashboard/student-dashboard/job/${slug}`;

  const SharePopup = () => (
    <div className="flex flex-col justify-center gap-2 mt-2 text-xl">
      <a
        href={`https://api.whatsapp.com/send?text=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#25D366] hover:scale-110"
      >
        <FaWhatsapp />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0077B5] hover:scale-110"
      >
        <FaLinkedin />
      </a>
      <a
        href={`https://t.me/share/url?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0088cc] hover:scale-110"
      >
        <FaTelegram />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1877F2] hover:scale-110"
      >
        <FaFacebook />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:scale-110"
      >
        <SiX />
      </a>
      <a
        href={`https://www.instagram.com/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E1306C] hover:scale-110"
      >
        <FaInstagram />
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E60023] hover:scale-110"
      >
        <FaPinterest />
      </a>
    </div>
  );

  return (
    <div className=" text-black relative z-10 max-w-3xl p-4 mx-auto space-y-4">
      <h1 className="text-xl font-bold text-red-600">{job?.title}</h1>
      <div className="absolute pt-2 top- right-4 group">
        <SharePopup />
      </div>
      <p className="text-gray-600">{job?.date}</p>

      {job?.jobImg && (
        <image
          src={job?.jobImg}
          alt={job?.title}
          className="w-full max-w-md my-4"
          width={500} // set image width
          height={300} // set image height
        />
      )}

      <p className="mb-2 text-lg font-semibold text-red-600">
        Short Information:
      </p>

      <div dangerouslySetInnerHTML={{ __html: job?.content }} />

      {/* ✅ Share Buttons Section */}
      <div className="pt-4 mt-8 border-t">
        <h3 className="mb-2 font-semibold text-center text-gray-700">
          Share this job:
        </h3>
        <div className="flex flex-row justify-center gap-2 mt-2 text-xl">
          <a
            href={`https://api.whatsapp.com/send?text=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:scale-110"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077B5] hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0088cc] hover:scale-110"
          >
            <FaTelegram />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:scale-110"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:scale-110"
          >
            <SiX />
          </a>
          <a
            href={`https://www.instagram.com/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E60023] hover:scale-110"
          >
            <FaPinterest />
          </a>
        </div>
      </div>
      <BookTeaser />
      <NotesTeaser />
    </div>
  );
};

export default JobDetails;
