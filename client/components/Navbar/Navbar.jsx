"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./Navbar.css";
import CreateJob from "@/app/admin/create-job/page";

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const jobsDropdownRef = useRef(null);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(payload);
        }
      }
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/jobs");
    window.location.reload();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (jobsDropdownRef.current && !jobsDropdownRef.current.contains(e.target)) {
        setJobsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
    <nav className="navbar">
      {/* ── Left: Logo + Title ── */}
      <Link href="/" className="navbar-brand">
        <div className="navbar-logo">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="3" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
            <line x1="10" y1="14" x2="14" y2="14" />
          </svg>
        </div>
        <span className="navbar-title">JobPortal</span>
      </Link>

      {/* ── Right: Nav links + User dropdown (desktop) ── */}
      <div className="navbar-right">
        { isMounted && user  ? (
          <div className="user-menu" ref={jobsDropdownRef}>
            <button
              className={`nav-link ${jobsDropdownOpen ? "nav-link-active" : ""}`}
              onClick={() => setJobsDropdownOpen((o) => !o)}
            >
              Jobs
              <svg
                className={`chevron ${jobsDropdownOpen ? "chevron-open" : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {jobsDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    router.push("/jobs");
                    setJobsDropdownOpen(false);
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  Explore Jobs
                </button>
                {user.role === "admin" && (
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowCreateJobModal(true);
                    setJobsDropdownOpen(false);
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Create Job
                </button>
                )}
                {user.role === "user" && (
                <button
                  className="dropdown-item"
                  onClick={() => {
                    router.push("/saved-jobs");
                    setJobsDropdownOpen(false);
                  }}
                >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  Saved Jobs
                </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/jobs"
            className="nav-link"
          >
            Jobs
          </Link>
        )}

        {user && user.role === "user" && (
          <Link
            href="/my-applications"
            className="nav-link"
          >
            My Applications
          </Link>
        )}

        {user && user.role === "admin" && (
          <>
            <Link
              href="/admin/dashboard"
              className="nav-link"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/applications"
              className="nav-link"
            >
              Applications
            </Link>
          </>
        )}

        {/* User dropdown or auth buttons */}
        { isMounted && user ? (
          <div className="user-menu" ref={dropdownRef}>
            <button
              className="user-avatar-btn"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-label="User menu"
            >
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="user-name">
                {user?.username ?? "User"}
              </span>
              <svg
                className={`chevron ${dropdownOpen ? "chevron-open" : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p className="dropdown-email">{user.email}</p>
                  {user.role === "admin" && (
                    <span className="dropdown-role-badge">Admin</span>
                  )}
                </div>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item dropdown-item-logout"
                  onClick={handleLogout}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link href="/login" className="nav-link">
              Login
            </Link>
            <Link href="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* ── Hamburger Button (mobile only) ── */}
      <button
        className={`hamburger-btn  ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </nav>

    {/* ── Mobile Menu Drawer ── */}
    <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
      <div className="mobile-menu-backdrop" onClick={closeMobile} />
      <div className="mobile-menu-panel">
        {/* User info card */}
        {isMounted && user && (
          <div className="mobile-user-info">
            <div className="mobile-user-avatar">
              {user?.username?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="mobile-user-details">
              <span className="mobile-user-name-text">{user?.username ?? "User"}</span>
              <span className="mobile-user-email-text">{user?.email}</span>
            </div>
            {user.role === "admin" && (
              <span className="mobile-nav-badge">Admin</span>
            )}
          </div>
        )}

        {/* Nav links */}
        <Link href="/jobs" className="mobile-nav-link" onClick={closeMobile}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Explore Jobs
        </Link>

        {isMounted && user?.role === "user" && (
          <>
            <Link href="/my-applications" className="mobile-nav-link" onClick={closeMobile}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              My Applications
            </Link>
            <Link href="/saved-jobs" className="mobile-nav-link" onClick={closeMobile}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Saved Jobs
            </Link>
          </>
        )}

        {isMounted && user?.role === "admin" && (
          <>
            <Link href="/admin/dashboard" className="mobile-nav-link" onClick={closeMobile}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Dashboard
            </Link>
            <Link href="/admin/applications" className="mobile-nav-link" onClick={closeMobile}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Applications
            </Link>
            <button
              className="mobile-nav-link"
              onClick={() => { setShowCreateJobModal(true); closeMobile(); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Job
            </button>
          </>
        )}

        {/* Auth or logout */}
        <div className="mobile-nav-divider" />
        {isMounted && user ? (
          <button className="mobile-nav-link mobile-logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="mobile-nav-link" onClick={closeMobile}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              Login
            </Link>
            <Link href="/signup" className="mobile-nav-link" onClick={closeMobile}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>

    <CreateJob open={showCreateJobModal} setOpen={setShowCreateJobModal} />
    </>
  );
}
