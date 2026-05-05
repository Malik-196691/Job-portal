"use client";
import DialogBox from "./DialogBox";
import { useState, useEffect } from "react";
import axios from "axios";
import EditJob from "./EditJob";

export default function JobCard({ job}) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setToken(token);
      if (token) {
        setUser(JSON.parse(atob(token.split(".")[1])));
        axios.get('http://localhost:3001/jobs/saved', {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          setSavedJobIds(res.data.jobs.map((job) => job.id));
        })
      }
    }
  }, []);
  const handleEdit = () => setOpen(true);
  const handleApply = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    axios.delete(`http://localhost:3001/jobs/${job.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  const handleSaveJob = () => {
    axios
      .post(`http://localhost:3001/jobs/save/${job.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSavedJobIds([...savedJobIds, job.id]);
      })
      .catch((err) => console.log(err));
  };

  const handleUnsaveJob = () => {
    axios
      .delete(`http://localhost:3001/jobs/unsave/${job.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then(() => {
        setSavedJobIds(savedJobIds.filter((id) => id !== job.id));
      })
      .catch((err) => console.log(err));
  };

  if (token) {
    if (user.role === "admin") {
      return (
        <>
          {open && <EditJob job={job} open={open} setOpen={setOpen} />}
          <div className="job-card">
            <div className="job-card-header">
              <div>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <span className="job-badge admin-badge">Admin</span>
            </div>
            <div className="job-tags">
              <span className="job-tag">📍 {job.location}</span>
              <span className="job-tag salary-tag">💰 {job.salary}</span>
            </div>
            <div className="job-actions">
              <button className="btn btn-edit" onClick={handleEdit}>
                ✏️ Edit
              </button>
              <button className="btn btn-delete" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      {open && <DialogBox job={job} open={open} setOpen={setOpen} />}
      <div className="job-card">
        <div className="job-card-header">
          <div>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company}</p>
          </div>
          <div>
            <button
              className={savedJobIds.includes(job.id) ? "btn btn-save" : "btn btn-save"}
              onClick={() => {
                savedJobIds.includes(job.id) ? handleUnsaveJob() : handleSaveJob();
              }}
            >
              {savedJobIds.includes(job.id) ? (
                <span>❤️ </span>
              ) : (
                <span>🤍</span>
              )}
            </button>
            <span className="job-badge hiring-badge">Hiring</span>
          </div>
        </div>
        <div className="job-tags">
          <span className="job-tag">📍 {job.location}</span>
          <span className="job-tag salary-tag">💰 {job.salary}</span>
        </div>
        <button className="btn btn-apply" onClick={handleApply}>
          Apply Now →
        </button>
      </div>
    </>
  );
}
