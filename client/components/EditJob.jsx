"use client"
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditJob({ job, open, setOpen }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [location, setLocation] = useState(job.location);
  const [salary, setSalary] = useState(job.salary);

  const handleEdit = async () => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${job.id}`,
      {
        title,
        company,
        location,
        salary,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <input
              className="form-input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <button className="btn btn-apply " onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-delete" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
