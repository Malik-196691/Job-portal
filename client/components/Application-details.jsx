"use client"
import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ApplicationDetails({
  application,
  setShowDetails,
  open,
}) {
  const router = useRouter();
  const [status, setStatus] = useState(
    application.status?.toLowerCase() || "pending",
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsSaving(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${application.id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowDetails(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={() => setShowDetails(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Applicant Info Section */}
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <label className="form-label">Applicant Name</label>
          <div className="form-input bg-slate-50 cursor-default">
            {application.user_name || "Unknown"}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Resume</label>
          <div className="form-input bg-slate-50 flex items-center h-auto py-3">
            {application.resume_url ? (
              <a
                href={application.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Resume →
              </a>
            ) : (
              <span className="text-slate-500 italic">No resume provided</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Cover Letter</label>
          <div
            className="form-input form-textarea bg-slate-50 cursor-default overflow-y-auto max-h-48"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {application.cover_letter || (
              <span className="text-slate-500 italic">
                No cover letter provided
              </span>
            )}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="form-group ">
          <label className="form-label">Application Status</label>
          <select
            className="form-input cursor-pointer bg-slate-50 transition-all duration-200 ease-in-out rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Actions */}
        <div className="job-actions" style={{ marginTop: "1.5rem" }}>
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => setShowDetails(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-apply"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
