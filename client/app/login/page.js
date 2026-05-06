'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const navigate = useRouter();
 
  const [formData, setFormData] = useState({
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
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        formData
      );
      localStorage.setItem("token", response.data);
      navigate.push("/jobs");
      navigate.refresh(); 
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="mt-10 mb-10 auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Please enter your details to sign in.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit">
            Sign In
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link href="/signup" className="auth-link">Sign up</Link>
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
          Are you an employer? <Link href="/admin/login" className="text-blue-600 font-semibold hover:underline">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
