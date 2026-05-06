'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AdminLogin() {
    const navigate = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/adminLogin`,
                formData,
            );
            localStorage.setItem("token", response.data);
            navigate.push("/admin/dashboard");
        } catch (error) {
            console.error(error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="mt-10 mb-10 auth-page">
            <div className="auth-card">
                <span className="job-badge admin-badge" style={{ alignSelf: 'center', marginBottom: '-10px' }}>Administration</span>
                <h1 className="auth-title">Admin Login</h1>
                <p className="auth-subtitle">Access the management dashboard.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Admin Email</label>
                        <input
                            className="form-input"
                            type="email"
                            name="username"
                            placeholder="Enter admin email"
                            value={formData.username}
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
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary auth-submit" style={{ background: '#0f172a' }}>
                        Login to Dashboard
                    </button>
                </form>
                <p className="auth-footer">
                    Not an admin? <Link href="/login" className="auth-link">User Login</Link>
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;