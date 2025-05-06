"use client";
import React, { useEffect, useState } from "react";
import SearchFilter from "../Search-filter";
import { Button } from "@mui/material";
import { Ranga } from "next/font/google";
import { RangeFilter } from "../range-filter";
import { DatePickerWithRange } from "../date-filter";
import { Label } from "@mui/icons-material";
const defalutInitialValue = {
  location: "",
  category: "",
  department: "",
  content: "",
  publishDate: "",
  salary: null,
  age: null,
  exprience: null,
};

const JobFilters = ({
  onApplyFilter,
  locations = [],
  categories = [],
  departments = [],
  contentData = [],
  dateLabel,
}) => {
  const [filters, setFilters] = useState(defalutInitialValue);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [departmentSuggestions, setDepartmentSuggestions] = useState([]);
  const [contentSuggestions, setContentSuggestions] = useState([]);
  const [resetDate, setResetDate] = useState(false);
  const [resetRange, setResetRange] = useState(false);
  const handleInputChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  const handleSearch = (key, value) => {
    if (key === "location") {
      setLocationSuggestions(
        locations.filter((location) =>
          location.toLowerCase().includes(value.toLowerCase())
        )
      );

      console.log(location);
    } else if (key === "category") {
      setCategorySuggestions(
        categories.filter((category) =>
          category.toLowerCase().includes(value.toLowerCase())
        )
      );
      console.log("Hello", categories);
    } else if (key === "department") {
      setDepartmentSuggestions(
        departments.filter((department) =>
          department.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else if (key === "content") {
      setContentSuggestions(
        contentData.filter((content) =>
          content.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    handleInputChange(key, value); // Update the filter value
  };

  const applyFilters = () => {
    onApplyFilter(filters);
  };

  const clearFilters = () => {
    setResetDate(true);
    setResetRange(true);
    setFilters(defalutInitialValue);
    setLocationSuggestions([]);
    setCategorySuggestions([]);
    setDepartmentSuggestions([]);
    setContentSuggestions([]);
    onApplyFilter(defalutInitialValue);
  };
  useEffect(() => {
    if (resetDate) setResetDate(false);
    if (resetRange) setResetRange(false);
  }, [resetDate, resetRange]);

  return (
    <>
      <div className="w-full text-black  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 justify-center items-center px-4 mt-4">
        {" "}
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
          placeholder="Passed Education..."
          value={filters.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        />
        {/* <SearchFilter
          placeholder="Admit Card..."
          value={filters.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        />
        <SearchFilter
          placeholder="Answer Key..."
          value={filters.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        />
        <SearchFilter
          placeholder="Result..."
          value={filters.content}
          suggestions={contentSuggestions}
          onSearch={(value) => handleSearch("content", value)}
          clearSuggestions={() => setContentSuggestions([])}
          clear={filters.content === ""}
        /> */}
        <div className="border-2 p-1 border-blue-700 hover:border-secondary rounded-xl min-w-[100px]">
          <RangeFilter
            min={10000}
            max={100000}
            label="Salary"
            onChange={(value) => {
              //console.log("Salary range selected:", value);
              setFilters({ ...filters, salary: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
        <div className="border-2 p-1 border-blue-700 hover:border-secondary rounded-xl min-w-[100px]">
          <RangeFilter
            min={15}
            max={40}
            label="Age"
            onChange={(value) => {
              //console.log("Age range selected:", value);
              setFilters({ ...filters, age: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
        <div className="border-2 p-1 border-blue-700 hover:border-secondary rounded-xl min-w-[100px]">
          <RangeFilter
            min={0}
            max={10}
            label="Exprience"
            onChange={(value) => {
              //console.log("Age range selected:", value);
              setFilters({ ...filters, exprience: value[0] });
            }}
            resetRange={resetRange}
          />
        </div>
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
          {" "}
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default JobFilters;
