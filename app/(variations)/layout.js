// app/(variations)/layout.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // If you want to use <Link> instead of <a>

export default function VariationsLayout({ children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={styles.wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Example: time in top-right corner (if you want it for all variations) */}
      {/* <div style={styles.topRightCorner}>
        <TimeDisplay />
      </div> */}

      {/* This is where the Variation’s own page.js is rendered */}
      <div style={styles.content}>
        {children}
      </div>

      {/* Bottom-right back button, hidden unless hovered */}
      <Link
        href="/"
        style={{
          ...styles.backLink,
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        ↩ Dashboard
      </Link>
    </div>
  );
}

// Reusable time display, if you want it for all variations
function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.timeDisplay}>
      {time.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  content: {
    // The Variation page’s content will fill here
    width: "100%",
    height: "100%",
  },
  topRightCorner: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  backLink: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    padding: "0.5rem 1rem",
    textDecoration: "none",
    borderRadius: "4px",
    transition: "opacity 0.3s",
  },
  timeDisplay: {
    fontSize: "1.5rem",
    color: "#333",
  },
};
