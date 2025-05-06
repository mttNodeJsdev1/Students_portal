"use client";

import React, { useEffect, useState } from "react";
import SearchFilter from "../Search-filter";
import { Button } from "@mui/material";
import { DatePickerWithRange } from "../date-filter";

const defaultInitialValue = {
  location: "",
  category: "",
  department: "",
  content: "",
  publishDate: "",
};

const AdmissionFilter = ({
  onApplyFilter,
  locations = [],
  categories = [],
  departments = [],
  contentData = [],
  dateLabel,
  dataplaceholder,
}) => {
  const [filters, setFilters] = useState(defaultInitialValue);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
  const [contentSuggestions, setContentSuggestions] = useState([]);
  const [resetDate, setResetDate] = useState(false);

  const handleInputChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  const handleSearch = (key, value) => {
    if (key === "location") {
      const filtered = locations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else if (key === "category") {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      );

      setCategorySuggestions(filtered);
    } else if (key === "department") {
      const filtered = departments.filter((department) =>
        department.toLowerCase().includes(value.toLowerCase())
      );
      setDepartmentSuggestions(filtered);
    } else if (key === "content") {
      const filtered = contentData?.filter((content) =>
        content.toLowerCase().includes(value.toLowerCase())
      );
      setContentSuggestions(filtered);
    }
    handleInputChange(key, value);
  };
  const applyFilters = () => {
    onApplyFilter(filters);
  };
  const clearFilters = () => {
    setResetDate(true);
    setFilters(defaultInitialValue);
    setLocationSuggestions([]);
    setCategorySuggestions([]);
    setDepartmentSuggestions([]);
    setContentSuggestions([]);
    onApplyFilter(defaultInitialValue);
  };
  useEffect(() => {
    if (resetDate) setResetDate(false);
  }, [resetDate]);
  return (
    <>
      <div className="  text-black w-full flex  gap-4 justify-center items-center px-4 mt-4">
        <SearchFilter
          placeholder="Location..."
          value={filters.location}
          suggestions={locationSuggestions}
          onSearch={(value) => handleSearch("location", value)}
          clearSuggestions={() => setLocationSuggestions([])}
          clear={filters.location === ""}
        />
        <SearchFilter
          placeholder="Category..."
          value={filters.category}
          suggestions={categorySuggestions}
          onSearch={(value) => handleSearch("category", value)}
          clearSuggestions={() => setCategorySuggestions([])}
          clear={filters.category === ""}
        />
        <SearchFilter
          placeholder="Department..."
          value={filters.department}
          suggestions={departmentSuggestions}
          onSearch={(value) => handleSearch("department", value)}
          clearSuggestions={() => setDepartmentSuggestions([])}
          clear={filters.department === ""}
        />
        <SearchFilter
          placeholder="Education..."
          value={filters?.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        />
        <div className="border-2 p-1 border-blue-700 hover:border-secondary rounded-xl min-w-[150px]">
          {/* <Label className=" text-gray-700 mb-2 text-center">
              {dateLabel} Publish Date of Job Posting
          </Label> */}
          <DatePickerWithRange
            onDateRangeChange={(selectedRange) =>
              handleInputChange("publishDate", selectedRange)
            }
            resetDate={resetDate}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-2 gap-4">
        <Button
          onClick={applyFilters}
          className="!text-white font-semibold !px-6 !py-3 !bg-blue-600 rounded-lg hover:bg-secondary transition duration-200"
        >
          Apply Filters
        </Button>
        <Button
          onClick={clearFilters}
          className="!bg-blue-600 !text-white font-semibold !px-6 !py-3 rounded-lg hover:bg-secondary transition duration-200"
        >
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default AdmissionFilter;
