'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ApplicationCard from "@/components/ApplicationCard";

export default function MyApplications() {
  const navigate = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate.push("/login");
      return;
    }
    let userId;
    try {
      userId = JSON.parse(atob(token.split(".")[1])).id;
    } catch (err) {
      console.error(err);
      navigate.push("/login");
      return;
    }
    

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/applications/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[calc(100vh-140px)] w-full max-w-5xl mx-auto px-4 py-12 relative z-10">
      {/* HEADER */}
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-4  mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight ">
            Applications
          </h1>
        </div>

        <p className="text-slate-500 text-sm sm:text-base max-w-2xl pl-1">
          Monitor your job applications, interview progress, and next steps all
          in one place.
        </p>
      </div>

      {/* BODY CONTENT */}
      <div className="relative">
        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">
              Loading your applications...
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && applications.length === 0 && (
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-12 text-center shadow-sm max-w-2xl mx-auto mt-10">
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
              No applications jumpstarted yet
            </h3>
            <p className="text-slate-500 mt-3 mb-8 text-base">
              Start applying to open opportunities! Once you do, you'll be able
              to track their real-time status right here.
            </p>

            <button
              onClick={() => navigate.push("/jobs")}
              className="cursor-pointer mt-8 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base font-bold shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Explore Available Jobs
            </button>
          </div>
        )}

        {/* LIST */}
        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 gap-5">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
