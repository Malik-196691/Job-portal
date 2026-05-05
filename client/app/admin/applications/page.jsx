'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import ApplicationCard from "@/components/ApplicationCard";
import { useRouter } from "next/navigation";
export default function Applications() {
  const [applications, setApplications] = useState([]);
  const navigate = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate.push("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data.applications || []);
      } catch (error) {
        console.error("Backend Error:", error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">Applications</h1>
      <div className="grid grid-cols-1 gap-4">
        {applications.length > 0 ? (
          applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        ) : (
          <p className="text-center mt-10 mb-10 text-slate-500 text-lg font-medium  w-full mx-auto h-[20vh]"> No applications found</p>
        )}
      </div>
    </div>
    </>
  );
} 
