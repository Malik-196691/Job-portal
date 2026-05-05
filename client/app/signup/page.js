'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/signup",
        formData
      );
      console.log(response.data);
      navigate.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 mb-10 auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-subtitle">Join us to start finding your dream job.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit">
            Sign Up
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link href="/login" className="auth-link">Log in</Link>
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          Are you an employer? <Link href="/admin/signup" className="text-blue-600 font-semibold hover:underline">Admin Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
