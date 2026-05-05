"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HighlightText } from "@/components/animate-ui/primitives/texts/highlight";
import { LiquidButton } from "@/components/animate-ui/components/buttons/liquid";

export default function Home() {
  const navigate = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="home-container">
      {/* Interactive moving gradient background */}
      <div
        className="animated-bg"
        style={{
          transform: `translate(${mousePos.x / 50}px, ${mousePos.y / 50}px)`,
        }}
      ></div>

      {/* Floating abstract orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Discover Your
            <HighlightText
              text="Dream Career"
              delay={0.4}
              className="highlight mr-2"
            />
            Today
          </h1>
          <p className="hero-subtitle">
            Connect with top employers from around the globe. Explore thousands
            of job opportunities and take the next big leap perfectly matched to
            your skills.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate.push("/jobs")}
            >
              Explore Jobs
            </button>
            <LiquidButton
              size="lg"
              className="px-[40px] py-[28px] rounded-lg cursor-pointer"
              onClick={() => navigate.push("/signup")}
            >
              Join Now
            </LiquidButton>
          </div>
        </div>

        <div className="hero-illustration">
          {/* Custom playful vector illustration mimicking hiring/search */}
          <svg
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="250" cy="200" r="160" fill="#E0E7FF" opacity="0.6" />

            <rect
              x="120"
              y="100"
              width="220"
              height="150"
              rx="16"
              fill="#FFFFFF"
              stroke="#3B82F6"
              strokeWidth="6"
              className="animated-path"
            />
            <path
              d="M150 140 H280 M150 175 H310 M150 210 H230"
              stroke="#CBD5E1"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Magnifying Glass */}
            <circle
              cx="340"
              cy="260"
              r="40"
              fill="#FFFFFF"
              stroke="#F59E0B"
              strokeWidth="8"
            />
            <path
              d="M370 290 L420 340"
              stroke="#F59E0B"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M330 250 L350 270 M350 250 L330 270"
              stroke="#F59E0B"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Sparkles */}
            <path
              d="M90 60 Q100 40 120 45 Q100 55 90 80 Q80 55 60 45 Q80 40 90 60 Z"
              fill="#10B981"
            />
            <path
              d="M430 90 Q435 80 445 82 Q435 88 430 100 Q425 88 415 82 Q425 80 430 90 Z"
              fill="#8B5CF6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
