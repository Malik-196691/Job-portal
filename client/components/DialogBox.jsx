"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DialogBox({ job, open, setOpen }) {
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await axios.post(
        `http://localhost:3001/applications/apply`,
        { jobId: job.id, resume_url: resumeUrl, cover_letter: coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Apply for {job.title}</h3>
            <p className="job-company">{job.company}</p>
          </div>
          <button className="modal-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Job Info Tags */}
        <div className="job-tags">
          <span className="job-tag">📍 {job.location}</span>
          <span className="job-tag salary-tag">💰 {job.salary}</span>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleApply}>
          <div className="form-group">
            <label className="form-label">Resume URL</label>
            <input
              className="form-input"
              type="text"
              placeholder="https://your-resume-link.com"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cover Letter</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Write a brief cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
          </div>
          <div className="job-actions">
            <button type="button" className="btn btn-delete" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-apply">
              Submit Application →
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
