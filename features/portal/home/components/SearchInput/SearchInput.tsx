"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
export default function SearchInput() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchRoom = () =>{
    const params = new URLSearchParams(searchParams.toString());
    if(startDate && endDate){
      params.set("startDate", format(startDate, "yyyy-MM-dd"));
      params.set("endDate", format(endDate, "yyyy-MM-dd"));
      params.set("page","1");
      router.replace(`/rooms?${params.toString()}`)
    }
  }


  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Start Date Input */}
        <div className="relative">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
            <CalendarIcon className="h-5 w-5 text-[#4E604F] mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Select start date"
              value={startDate ? format(startDate, "MMM dd, yyyy") : ""}
              onFocus={() => {
                setIsStartCalendarOpen(true);
                setIsEndCalendarOpen(false);
              }}
              readOnly
              className="w-full outline-none text-sm bg-transparent cursor-pointer"
            />
          </div>
          {/* Start Date Calendar */}
          {isStartCalendarOpen && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <div className="bg-white shadow-2xl rounded-lg border p-4">
                              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-[#4E604F]">Select start Date</h3>
                  <button
                    onClick={() => setIsStartCalendarOpen(false)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Close
                  </button>
                </div>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setIsStartCalendarOpen(false);
                  }}
                  className="rounded-lg border"
                />
              </div>
            </div>
          )}
        </div>

        {/* End Date Input */}
        <div className="relative">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
            <CalendarIcon className="h-5 w-5 text-[#4E604F] mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Select end date"
              value={endDate ? format(endDate, "MMM dd, yyyy") : ""}
              onFocus={() => {
                setIsEndCalendarOpen(true);
                setIsStartCalendarOpen(false);
              }}
              readOnly
              className="w-full outline-none text-sm bg-transparent cursor-pointer"
            />
          </div>
          {/* End Date Calendar */}
          {isEndCalendarOpen && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <div className="bg-white shadow-2xl rounded-lg border p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-[#4E604F]">Select End Date</h3>
                  <button
                    onClick={() => setIsEndCalendarOpen(false)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Close
                  </button>
                </div>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setIsEndCalendarOpen(false);
                  }}
                  className="rounded-lg border"
                />
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button onClick={handleSearchRoom} className="cursor-pointer bg-[#4E604F] hover:bg-[#434842] text-white px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Search className="h-5 w-5" />
          <span>Search Hotels</span>
        </button>
      </div>
    </div>
  );
}