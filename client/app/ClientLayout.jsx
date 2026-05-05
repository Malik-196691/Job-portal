"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import axios from "axios";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("login") || pathname.includes("signup");
  const isAdminPage = pathname.startsWith("/admin/dashboard") ;
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Check token expiration periodically
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
          }
        } catch (e) {
          localStorage.removeItem("token");
        }
      }
    };
    
    checkToken();
    const interval = setInterval(checkToken, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Axios interceptor for 403/401 responses
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // If the error is due to an invalid/expired token, log out
          if (error.response.data && error.response.data.message === "token is invalid or expired") {
            localStorage.removeItem("token");
            if (!window.location.pathname.includes("/login")) {
              window.location.href = "/login";
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <div id="root" className={isHomePage ? "full-screen-root" : ""}>
      {!isAuthPage && !pathname.startsWith("/admin/login") && !isHomePage && <Navbar />}
      {children}
      {!isAuthPage && !isAdminPage && !isHomePage && <Footer />}
    </div>
  );
}
