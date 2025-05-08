"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
// import { getItem, setItem } from "@/utils/indexedDB";
const Profile = () => {
  const defaultFormData = {
    id: "",
    studentCode: "",
    name: "",
    email: "",
    mobile: "",
    education: "",
    gender: "",
    DOB: "",
    city: "",
    pincode: "",
    tehsil: "",
    state: "",
    subject: "",
    studentImg: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setFormData({
      ...defaultFormData,
      ...data,
      gender: data?.gender ?? "", // <- force "" if undefined/null
      education: data?.education ?? "", // <- same here
    });
  }, []);

  useEffect(() => {
    if (formData.id) {
      localStorage.setItem("data", JSON.stringify(formData));
    }
  }, [formData]);

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      alert("Student ID is missing. Cannot update profile.");
      console.log("Missing Id in formData", formData);
      return;
    }

    try {
      const response = await axios.put(
        `https://backend.indiasarkarinaukri.com/newUser/student/${formData.id}`,
        formData
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update student profile:", error);
    }
  };

  //  Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setAlertMessage("Only JPG, JPEG, and PNG files are allowed.");
        setShowAlert(true);
        return;
      }
      if (file.size > 30 * 1024) {
        setAlertMessage("Please select an image smaller than 30KB.");
        setShowAlert(true);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, studentImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, studentImg: "/images/profile-logo.png" });
  };
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen p-6">
      <h2 className="self-start w-full mb-4 text-3xl font-semibold text-center text-black">
        Profile
      </h2>
      <div className="relative w-24 h-24 mb-10 md-6 group">
        <img
          src={
            formData.studentImg && formData.studentImg.trim() !== ""
              ? formData.studentImg
              : "/images/profile-logo.png"
          }
          alt="profile"
          className="object-cover w-24 h-24 border-2 border-gray-300 rounded-full"
        />

        {/* Icons visible on hover */}
        <div className="absolute bottom-0 flex gap-2 transition-opacity duration-300 transform -translate-x-1/2 translate-y-1/2 opacity-0 left-1/2 group-hover:opacity-100">
          {/* Upload icon */}
          <label className="p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600">
            <input
              type="file"
              name="profilePic"
              onChange={handleImageChange}
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9"
              />
            </svg>
          </label>

          {/* Delete icon */}
          <button
            className="p-2 bg-red-500 rounded-full hover:bg-red-600"
            onClick={handleImageRemove}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <form
        onSubmit={updateProfile}
        className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3"
      >
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">Name</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>
        {/* <span className="">Student Code</span> */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">
            Student Code
          </span>
          <input
            name="studentCode"
            value={formData.studentCode}
            placeholder="Student Code"
            className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-md cursor-not-allowed input"
            disabled
          />
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">Gender</span>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">Mobile</span>

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">Mobile</span>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">
            Date Of Birth
          </span>

          <input
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            type="date"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">
            Pincode
          </span>

          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">Tehsil</span>

          <input
            name="tehsil"
            value={formData.tehsil}
            onChange={handleChange}
            placeholder="Tehsil"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">City</span>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">
            Education
          </span>

          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
            required
          >
            <option value="">Select your education</option>
            <option value="highschool">High School</option>
            <option value="bachelor">Bachelor Degree</option>
            <option value="master">Master Degree</option>
            <option value="phd">PhD</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">
            Subject
          </span>

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-sm font-medium text-gray-700">State</span>

          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="px-4 py-2 border border-gray-400 rounded-md input focus:outline-blue-500"
          />
        </div>
        <button
          type="submit"
          className="content-center px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-400 cursor-pointer rounded mr-30 "
        >
          Save & Change
        </button>
      </form>
    </div>
  );
};
export default Profile;
