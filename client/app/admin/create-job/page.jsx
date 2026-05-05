"use client";
import { useState } from "react";
import axios from "axios";

export default function CreateJob({ open, setOpen }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3001/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setOpen(false)}>
        <div
          className=" modal w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-fit"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-gray-200 bg-white px-8 py-7"
          >
            <header className="mb-7">
              <h1 className="text-3xl font-bold text-gray-900 ">
                Create New Job
              </h1>
            </header>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 mb-6">
              {/* Job Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Company/Organization */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="e.g. TechCorp Inc."
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Salary */}
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  placeholder="e.g. 100000"
                  min={0}
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn btn-delete  "
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-apply ">
                Publish Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
