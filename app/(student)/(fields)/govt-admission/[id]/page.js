"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // Import Image from next/image

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

const AdmissionDetails = () => {
  const { id } = useParams();
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAdmissionDetails = async () => {
      try {
        const response = await fetch(
          `https://backend.indiasarkarinaukri.com/admission/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAdmission(data);
        } else {
          setError("Failed to fetch admission details.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionDetails();
  }, [id]);

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  const shareUrl = `https://indiasarkarinaukri.com/dashboard/student-dashboard/admission/${id}`;

  const SharePopup = () => (
    <div className="flex flex-col justify-center gap-2 text-xl">
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
    <div className="relative z-10 flex w-full px-4 py-6 sm:px-6 lg:px-8 ">
      <div className="w-[700px]  rounded-2xl shadow p-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          {admission?.title}
        </h1>

        <p className="mb-4 text-sm text-gray-500">{admission?.date}</p>
        <div className="absolute pt-2 top-8 right-80 group">
          <SharePopup />
        </div>

        <Image
          src={admission?.admissionImg}
          alt={admission?.title}
          width={700} // Set image width
          height={400} // Set image height
          className="w-full mb-6 rounded-lg"
        />

        <p className="mb-2 text-lg font-semibold text-red-600">
          Short Information:
        </p>

        <div
          className="w-full prose-sm prose text-justify sm:prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: admission?.content }}
        />
        <div className="pt-4 mt-8 border-t">
          <h3 className="mb-2 font-semibold text-center text-gray-700">
            Share this page:
          </h3>
          <div className="flex flex-row justify-center gap-2 text-xl">
            <a
              href={`https://web.whatsapp.com/send?text=${shareUrl}`}
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
      </div>
      <BookTeaser />
      <NotesTeaser />
    </div>
  );
};

export default AdmissionDetails;
