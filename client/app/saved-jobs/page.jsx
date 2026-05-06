"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "@/components/JobCard";
import { useRouter } from "next/navigation";

export default function SavedJobs() {
  const navigate = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://localhost:3001/jobs/saved", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setJobs(response.data.jobs);
      })
     .finally(() => {
      setLoading(false);
     })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="page">
        {!loading && jobs.length === 0 ? (
          <div className="backdrop-blur-md rounded-3xl p-12 text-center max-w-2xl mx-auto mt-10 h-[70vh]">
            <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-400"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              No Saved Jobs
            </h3>
            <p className="text-slate-500 mt-3 mb-8 text-base">
              You haven't saved any jobs yet.
            </p>
            <button
              onClick={() => navigate.push("/jobs")}
              className="cursor-pointer mt-8 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base font-bold shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all sm:w-auto"
            >
              Explore Available Jobs
            </button>
          </div>
        ) :loading ? (
           <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">
              Loading ...
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-0 px-6 text-3xl text-slate-800 font-bold">Saved Jobs</h1>
            <div className="job-list-wrapper">
              <div className="job-grid">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} jobs={jobs}/>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
