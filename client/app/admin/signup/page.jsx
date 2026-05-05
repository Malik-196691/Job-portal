'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AdminSignup() {
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
                "http://localhost:3001/users/adminSignup",
                formData,
            );
            console.log(response.data);
            navigate.push("/admin/login");
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="mt-10 mb-10 auth-page">
            <div className="auth-card">
                <span className="job-badge admin-badge" style={{ alignSelf: 'center', marginBottom: '-10px' }}>Administration</span>
                <h1 className="auth-title">Admin Registration</h1>
                <p className="auth-subtitle">Create a new administrator account.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
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
                            placeholder="Create admin password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary auth-submit" style={{ background: '#0f172a' }}>
                        Create Admin Account
                    </button>
                </form>
                <p className="auth-footer">
                    Already an admin? <Link href="/admin/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminSignup;