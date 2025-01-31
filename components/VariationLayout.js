"use client";
import React, { useState } from "react";

function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  React.useEffect(() => {
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

/**
 * VariationLayout:
 * - Renders a full-viewport container (light or dark).
 * - Shows time in top-right corner.
 * - Hides "Back to Dashboard" link until hover.
 * - Children is where you place the Variation's unique content.
 *
 * Props:
 *   - children: ReactNode (the Variation's entire content)
 *   - darkMode: boolean (if true => black background, white text)
 */
export default function VariationLayout({ children, darkMode = false }) {
  const [hovered, setHovered] = useState(false);

  const containerStyles = darkMode
    ? styles.containerDark
    : styles.containerLight;

  return (
    <div
      style={{ ...styles.pageWrapper, ...containerStyles }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Time in the top-right corner */}
      <div style={styles.topRightCorner}>
        <TimeDisplay />
      </div>

      {/* Variation-specific content goes here */}
      <div style={styles.contentWrapper}>{children}</div>

      {/* Bottom-right link to Dashboard, hidden unless hovered */}
      <a
        href="/"
        style={{
          ...styles.backLink,
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        ↩ Dashboard
      </a>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  containerLight: {
    backgroundColor: "#fafafa",
    color: "#333",
  },
  containerDark: {
    backgroundColor: "#000",
    color: "#fff",
  },
  topRightCorner: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  contentWrapper: {
    flex: 1,
    // Provide top padding if you want to avoid overlapping the time display
    paddingTop: "3rem",
  },
  backLink: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    textDecoration: "none",
    backgroundColor: "#333",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "opacity 0.3s ease",
  },
  timeDisplay: {
    fontSize: "1.5rem",
  },
};
