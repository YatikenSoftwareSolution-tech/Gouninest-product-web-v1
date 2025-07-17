// PriceRangeSlider.tsx
"use client";
import React, { useState, useEffect } from "react";
import RangeSlider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRange {
  min: number;
  max: number;
}

interface RangeSliderProps {
  maxPrice: number;
  selectedRange: PriceRange;
    onPriceRangeChange: (range: PriceRange) => void;
  currencySymbol: string;
}

export const PriceRangeSlider: React.FC<RangeSliderProps> = ({
  maxPrice,
  selectedRange,
  onPriceRangeChange,
  currencySymbol,
}) => {
  const [localPriceRange, setLocalPriceRange] =
    useState<PriceRange>(selectedRange);

  // Sync with external changes
  useEffect(() => {
    setLocalPriceRange(selectedRange);
  }, [selectedRange]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const [min, max] = value;
      setLocalPriceRange({ min, max });
    }
  };

  const handleSliderChangeComplete = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const [min, max] = value;
      onPriceRangeChange({ min, max });
    }
  };

  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(Math.max(numValue, 0), maxPrice);

    setLocalPriceRange((prev) => {
      const newRange = {
        min: type === "min" ? clampedValue : prev.min,
        max: type === "max" ? clampedValue : prev.max,
      };

      // Ensure min <= max
      if (newRange.min > newRange.max) {
        if (type === "min") newRange.max = newRange.min;
        else newRange.min = newRange.max;
      }

      return newRange;
    });
  };

  const handleInputBlur = () => {
    onPriceRangeChange(localPriceRange);
  };

  return (
    <div className="px-2 pb-1">
      <RangeSlider
        range
        min={0}
        max={maxPrice}
        allowCross={false}
        value={[localPriceRange.min, localPriceRange.max]}
        onChange={handleSliderChange}
        onChangeComplete={handleSliderChangeComplete}
        trackStyle={[{ backgroundColor: "#5d3d72" }]}
        handleStyle={[
          { backgroundColor: "#5d3d72", borderColor: "#5d3d72" },
          { backgroundColor: "#5d3d72", borderColor: "#5d3d72" },
        ]}
        railStyle={{ backgroundColor: "#ccc" }}
      />

      <div className="flex items-center justify-between mt-2">
        <div className="w-24 relative">
          <label className="absolute top-0 left-3 block text-xs pt-1 text-gray-700">
            Minimum
          </label>
          <div className="">
            <span className="absolute top-4 left-3 text-[13px] font-semibold">
              {currencySymbol}
            </span>
            <input
              type="number"
              className="w-full px-2 pl-8 py-1.5 pt-5 h-10 border border-gray-400 rounded-lg text-sm font-semibold"
              value={localPriceRange.min}
              onChange={(e) => handleInputChange("min", e.target.value)}
              onBlur={handleInputBlur}
              min={0}
              max={maxPrice}
            />
          </div>
        </div>
        <div className="w-24 relative">
          <label className="absolute right-[34px] block text-xs pt-1 text-gray-700">
            Maximum
          </label>
          <div>
            <span className="absolute top-[17px] right-[70px] text-[13px] font-semibold">{currencySymbol}</span>
            <input
              type="number"
              className="w-full px-2 pl-[27px] py-1.5 pt-5 h-10 border border-gray-400 rounded-lg text-[13px] font-semibold"
              value={localPriceRange.max}
              onChange={(e) => handleInputChange("max", e.target.value)}
              onBlur={handleInputBlur}
              min={0}
              max={maxPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
