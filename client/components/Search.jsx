"use client";
import { useState } from "react";

export default function Search({ filters, setFilters, jobs }) {
  const [searchInput, setSearchInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [company,setCompany]=useState("");
  const [minSalary,setMinSalary]=useState("");
  const [maxSalary,setMaxSalary]=useState("");
  const [sort,setSort]=useState("");


  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, keyword: searchInput });
    setShowFilters(false);
  };


  const clearFilters = () => {
    setCompany("");
    setMinSalary("");
    setMaxSalary("");
    setSort("");
    setFilters({ keyword: "", minSalary: "", maxSalary: "", company: "", sort: "" });
  };


  return (
    <div className="w-full max-w-3xl mx-auto px-3">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg shadow-sm px-2 py-1.5 lg:rounded-xl lg:w-[30rem] lg:mx-auto"
      >
        {/* Input */}
        <div className="flex items-center flex-1 px-2">
          <svg
            className="w-4 h-4 text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            type="text"
            placeholder="Search jobs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm border transition 
            ${
              showFilters
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span className="hidden sm:inline">Filters</span>
        </button>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="filter-modal mt-2 bg-white border border-gray-200 shadow-md rounded-lg p-3 lg:w-[30rem] lg:mx-auto lg:rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <select 
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500">
              <option> Sort By</option>
              <option value="salary_asc"> Salary (Asc)</option>
              <option value="salary_desc"> Salary (Desc)</option>
            </select>

            <select
            value={filters.company}
            onChange={(e)=>setCompany(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500">
              <option value="">Company</option>
              {jobs?.map((job) => (
                <option value={job.company} key={job.id}>{job.company}</option>
              ))}
            </select>

            <select
            value={filters.minSalary}
            onChange={(e)=>setMinSalary(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500">
              <option>Min Salary</option>
              <option value="50000">50000</option>
              <option value="100000">100000</option>
              <option value="150000">150000</option>
            </select>

            <select
            value={filters.maxSalary}
            onChange={(e)=>setMaxSalary(e.target.value)}
            className="border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500">
              <option>Max Salary</option>
              <option value="50000">50000</option>
              <option value="100000">100000</option>
              <option value="150000">150000</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => {
                clearFilters();
              }}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={() => { setFilters({ ...filters, company, minSalary, maxSalary, sort }); setShowFilters(false);}}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}