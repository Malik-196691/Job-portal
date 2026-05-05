"use client";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Search from "./Search";
import axios from "axios";

export default function JobList() {
  const [jobs, setJobs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    minSalary: "",
    maxSalary: "",
    company: "",
    sort: "",
  });

  useEffect(() => {
    const apiUrl = `http://localhost:3001/jobs?page=${currentPage}`;

    // Build the query string dynamically
    const queryParams = new URLSearchParams();

    if (filters.keyword) queryParams.set("keyword", filters.keyword);
    if (filters.minSalary) queryParams.set("minSalary", filters.minSalary);
    if (filters.maxSalary) queryParams.set("maxSalary", filters.maxSalary);
    if (filters.company) queryParams.set("company", filters.company);
    if (filters.sort) queryParams.set("sort", filters.sort);

    axios
      .get(`${apiUrl}&${queryParams.toString()}`)
      .then((res) => res.data)
      .then((data) => setJobs(data.jobs))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="job-list-wrapper">
        <Search filters={filters} setFilters={setFilters} jobs={jobs} />
        <div className="job-grid">
          {jobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {jobs?.length === 0 && <p className="no-jobs">No jobs found</p>}
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
          >
            ← Previous
          </button>
          <span className="page-indicator">Page {currentPage}</span>
          <button
            className="page-btn"
            onClick={() =>
              setCurrentPage(currentPage < 3 ? currentPage + 1 : 3)
            }
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
}
