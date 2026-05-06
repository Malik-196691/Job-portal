"use client";
import { useState } from "react";
import axios from "axios";
import ApplicationDetails from "@/components/Application-details";

export default function ApplicationCard({ application }) {
  const token = localStorage.getItem("token");
  const [showDetails, setShowDetails] = useState(false);
  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleDelete = () => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/applications/${application.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  const statusColors = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    accepted: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    reviewing: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const currentStatus = application.status?.toLowerCase() || "pending";
  const statusClass =
    statusColors[currentStatus] ||
    "bg-slate-50 text-slate-700 border-slate-200";

  if (token) {
    const user = JSON.parse(atob(token.split(".")[1]));
    if (user.role === "admin") {
      return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
              {application.job_title || "Untitled Role"}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Application ID: #{application.id || "---"}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${statusClass} flex-1  sm:flex-none text-center w-28`}
            >
              {application.status || "Pending"}
            </span>
            <button onClick={handleViewDetails} className="px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-xl text-sm font-semibold transition-colors cursor-pointer active:scale-95">
              View Details
            </button>
          </div>
          {showDetails && <ApplicationDetails application={application} setShowDetails={setShowDetails} open={showDetails}/>}
        </div>
      );
    }
  }
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
          {application.job_title || "Untitled Role"}
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          Application ID: #{application.id || "---"}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${statusClass} flex-1 sm:flex-none text-center`}
        >
          {application.status || "Pending"}
        </span>
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
