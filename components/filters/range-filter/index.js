"use client";
import React, { useEffect, useState } from "react";

export function RangeFilter({
  min = 0,
  max = 100,
  label,
  onChange,
  resetRange,
}) {
  const [value, setValue] = useState(min);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange && onChange([newValue]);
  };

  useEffect(() => {
    if (resetRange) {
      setValue(min);
      onChange && onChange([min]);
    }
  }, [resetRange, min, onChange]);

  return (
    <div className=" text-black flex flex-col items-center py-2 ">
      <span className="text-gray-700 font-semibold text-center text-sm mb-2">
        {label}: {value}
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={handleChange}
        className="w-full h-1 appearance-none bg-gray-300 rounded-md cursor-pointer"
      />
    </div>
  );
}
