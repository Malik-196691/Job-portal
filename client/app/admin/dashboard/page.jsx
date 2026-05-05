"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAnalytics(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-10 flex flex-col items-center">
      <div className="w-full max-w-5xl px-4 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight m-0">
            Admin Dashboard
          </h1>
          <span className="job-badge admin-badge">Administration</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center gap-2">
                <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
                  Total Jobs
                </p>
                <p className="text-5xl font-bold text-blue-600">
                  {analytics.totalJobs || 0}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center gap-2">
                <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
                  Total Applications
                </p>
                <p className="text-5xl font-bold text-emerald-500">
                  {analytics.totalApplications || 0}
                </p>
              </div>
            </div>

            {analytics.statusStats && analytics.statusStats.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
                  Application Status Overview
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {analytics.statusStats.map((stat) => (
                    <div
                      key={stat.status}
                      className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <p className="text-3xl font-bold text-slate-700 mb-1">
                        {stat.count}
                      </p>
                      <span className="job-badge capitalize bg-blue-100 text-blue-700">
                        {stat.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
