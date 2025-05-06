"use client";
import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

export function DatePickerWithRange({ onDateRangeChange, resetDate }) {
  const [date, setDate] = useState({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const handleDateChange = (event, key) => {
    const selectedDate = new Date(event.target.value);
    setDate((prev) => ({
      ...prev,
      [key]: selectedDate,
    }));
  };

  // ✅ This effect only runs when `date` changes (not when function reference changes)
  useEffect(() => {
    if (date.from && date.to) {
      onDateRangeChange(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (resetDate) {
      setDate({
        from: new Date(2024, 0, 20),
        to: addDays(new Date(2024, 0, 20), 20),
      });
    }
  }, [resetDate]);

  return (
    <div className=" text-black   px-4 py-2 rounded-md">
      <label className="block font-semibold text-xs">Select Date Range:</label>
      <input
        type="date"
        value={format(date?.from, "yyyy-MM-dd")}
        onChange={(e) => handleDateChange(e, "from")}
        className="border px-2 py-1 rounded w-28 text-sm"
      />
      <span className="text-black text-xs flex justify-center">to</span>
      <input
        type="date"
        value={format(date?.to, "yyyy-MM-dd")}
        onChange={(e) => handleDateChange(e, "to")}
        className="border px-2 py-1 rounded w-28 text-sm"
      />
    </div>
  );
}
