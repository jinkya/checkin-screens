"use client";
import React from "react";

export default function DashboardPage() {
  const variations = [
    {
      slug: "variation1",
      title: "Classic Modular Check-In with External CSS",
      description:
        "A structured and modular check-in system using React components with an external CSS module. This variant follows a clean separation of concerns, making it easy to maintain and scale.",
    },
    {
      slug: "variation2",
      title: "Dark-Themed Check-In with Inline Styles",
      description:
        "A visually appealing check-in system with a dark theme, implemented using inline styles for better component encapsulation. Includes smooth animations and interactive UI elements.",
    },
    {
      slug: "variation3",
      title: "Minimalist Check-In with Large Typography",
      description:
        "A sleek, minimal check-in experience with large, readable typography and a modern layout. Focused on user-friendliness with a simple interface and streamlined interactions.",
    },
    {
      slug: "variation4",
      title: "Responsive Check-In with Dynamic Sizing",
      description:
        "A fully responsive check-in system with dynamic sizing based on viewport dimensions. Ideal for kiosks and large screens, ensuring a seamless experience across devices.",
    },
    {
      slug: "variation5",
      title: "Kiosk-Optimized Check-In with User Guidance",
      description:
        "Designed for self-service kiosks, this variant features clear user guidance, large buttons, and an intuitive layout. Includes subtle animations and a step-by-step check-in process.",
    },
    {
      slug: "variation6",
      title: "Grid-Based Check-In with Dual-Pane Layout",
      description:
        "A modern check-in system with a structured grid-based layout, supporting a dual-pane experience. Ideal for high-traffic environments, balancing information display and user interaction.",
    },
    {
      slug: "variation7",
      title: "Futuristic Check-In with Glassmorphism UI",
      description:
        "A sleek and modern check-in system featuring a glassmorphism-inspired UI with soft shadows, gradients, and elegant card-based layouts. Designed for premium kiosks with a high-end visual appeal.",
    },
    {
      slug: "variation8",
      title: "Minimalist System Login with Split View Status",
      description:
        "A clean and structured check-in system with a split-view interface. Features an intuitive login screen that transitions into a real-time system status panel, ideal for administrative check-ins and secure access control.",
    },
    {
      slug: "variation9",
      title: "Elegant Monochrome Check-In System",
      description:
        "A refined, minimalistic check-in system with a monochrome theme and a focus on simplicity. Features a structured input form and a clear, distraction-free layout for an efficient user experience.",
    },
    {
      slug: "variation10",
      title: "Dark Mode Check-In with Split UI",
      description:
        "A bold and sleek check-in system with a dark theme and split UI. Includes a large digital clock display, a clean booking form, and a dedicated success panel for a futuristic and immersive experience.",
    },
    {
      slug: "variation11",
      title: "Soft Blue Minimalist Check-In",
      description:
        "A professional and visually calming check-in system using soft blue tones. Features a dual-panel layout for booking input and success details, ensuring a seamless and modern check-in process.",
    },
    {
      slug: "variation12",
      title: "High-Contrast Blackout Kiosk UI",
      description:
        "A cutting-edge, high-contrast check-in kiosk UI with a full black theme. Designed for efficiency and clarity, it features a structured login form, status tracking, and auto-reset functionality.",
    },
  ];

  return (
    <div style={styles.page}>
      {/* A Hero section with a gradient background */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>NEOM Check-In Demo</h1>
        <p style={styles.heroSubtitle}>
          Select a Variation below to preview the check-in experience.
        </p>
      </section>

      {/* A container for our variation cards */}
      <section style={styles.cardsContainer}>
        {variations.map((variation) => (
          <a
            key={variation.slug}
            href={`/${variation.slug}`}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <h2 style={styles.cardTitle}>{variation.title}</h2>
            <p style={styles.cardDescription}>{variation.description}</p>
            <span style={styles.cardLink}>View →</span>
          </a>
        ))}
      </section>
    </div>
  );
}

const styles = {
  // Page background
  page: {
    margin: 0,
    padding: 0,
    fontFamily: "system-ui, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  // Hero section with gradient
  heroSection: {
    background: "linear-gradient(135deg, #5D54A4 0%, #7C78B7 100%)",
    color: "#fff",
    padding: "4rem 2rem",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: 700,
    margin: 0,
    marginBottom: "1rem",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.5,
  },
  // Container for the cards
  cardsContainer: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  // Each card
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    textDecoration: "none",
    color: "#333",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    fontWeight: 600,
  },
  cardDescription: {
    flex: 1,
    fontSize: "1rem",
    lineHeight: 1.4,
    marginBottom: "1rem",
    color: "#555",
  },
  cardLink: {
    marginTop: "auto",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#0070f3",
  },
};
