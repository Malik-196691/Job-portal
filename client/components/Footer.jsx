"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" w-full bg-white border-t border-slate-200 mt-10 rounded-t-2xl shadow-lg  bottom-0 left-0 right-0 z-50 " >
      <div className="w-full px-6 py-8">  
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 max-w-7xl mx-auto">
          {/* Brand */}
          <div className="gap-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 text-slate-800 text-lg font-bold tracking-tight">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                <svg
                  width="18"
                  height="18"
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
              JobPortal
            </div>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">
              Connecting talent worldwide with their dream opportunities.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 mt-2 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link href="/jobs" className="hover:text-blue-500 transition-colors">
              Jobs
            </Link>
            <Link href="/login" className="hover:text-blue-500 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="hover:text-blue-500 transition-colors">
              Sign Up
            </Link>
            <span className="hidden sm:inline text-slate-200">|</span>
            <Link href="/admin/login" className="hover:text-blue-500 transition-colors">
              Employers
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-3 mt-1">
            <a href="#" aria-label="Twitter" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.2-1-3 2.5-.3 5-1.2 5-6 0-1.3-.5-2.5-1.4-3.4.1-.3.6-1.6-.1-3.4 0 0-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6 0C6.1 2.8 5 3.1 5 3.1c-.7 1.8-.2 3.1-.1 3.4-.9.9-1.4 2.1-1.4 3.4 0 4.8 2.5 5.7 5 6-.6.5-1 1.4-1 2.8V21" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-100 mt-6 pt-4 text-center text-xs text-slate-400 max-w-7xl mx-auto">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
