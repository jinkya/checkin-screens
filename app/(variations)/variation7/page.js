"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, QrCode, RotateCcw } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    background: 'linear-gradient(145deg, #e6e9f0 0%, #eef1f5 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    height: '120px',
    padding: '0 64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #4161ff 0%, #8d5fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  time: {
    fontSize: '24px',
    color: '#4a5568',
    fontWeight: '500',
    padding: '8px 16px',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)',
    borderRadius: '8px',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  mainContent: {
    flex: 1,
    height: '772px', // Adjusted for new header height (892px - 120px)
    padding: '40px 40px 60px 40px', // Increased bottom padding
    display: 'grid',
    gridTemplateColumns: '860px 860px',
    gap: '16px',
    justifyContent: 'center',
  },
  card: {
    background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '24px',
    height: '732px',
    padding: '48px',
    boxShadow: `
      0 12px 24px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.05),
      inset 0 1px 1px rgba(255, 255, 255, 0.8)
    `,
    border: '1px solid rgba(255, 255, 255, 0.4)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '48px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '64px',
    textShadow: '0 1px 1px rgba(255, 255, 255, 1)',
  },
  inputWrapper: {
    marginBottom: '48px',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: '72px',
    fontSize: '24px',
    padding: '0 24px',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)',
    color: '#2d3748',
    outline: 'none',
    boxShadow: `
      inset 0 2px 4px rgba(0, 0, 0, 0.05),
      0 1px 1px rgba(255, 255, 255, 0.8)
    `,
    transition: 'all 0.3s ease',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginTop: 'auto',
    paddingBottom: '40px', // Added bottom padding for buttons
  },
  primaryButton: {
    height: '72px',
    fontSize: '24px',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #4161ff 0%, #8d5fff 100%)',
    boxShadow: `
      0 4px 8px rgba(65, 97, 255, 0.3),
      0 2px 4px rgba(65, 97, 255, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.2)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    transition: 'all 0.2s ease',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  },
  secondaryButton: {
    height: '72px',
    fontSize: '24px',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)',
    boxShadow: `
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 1px 1px rgba(255, 255, 255, 0.8),
      0 1px 2px rgba(0, 0, 0, 0.1)
    `,
    color: '#4a5568',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  welcomeSection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-out',
  },
  hotelIcon: {
    width: '120px',
    height: '120px',
    marginBottom: '32px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
  },
  welcomeTitle: {
    fontSize: '40px',
    color: '#2d3748',
    fontWeight: '600',
    marginBottom: '24px',
    textShadow: '0 1px 1px rgba(255, 255, 255, 1)',
  },
  welcomeText: {
    fontSize: '24px',
    color: '#4a5568',
    lineHeight: '1.5',
    maxWidth: '600px',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)',
  },
  resultSection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.5s ease-out',
  },
  resultHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  resultTitle: {
    fontSize: '40px',
    color: '#2d3748',
    fontWeight: '600',
    marginTop: '24px',
    textShadow: '0 1px 1px rgba(255, 255, 255, 1)',
  },
  roomDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '48px',
    flex: 1,
    overflowY: 'auto',
  },
  roomDetail: {
    background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: `
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 1px 1px rgba(255, 255, 255, 0.8)
    `,
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  roomLabel: {
    fontSize: '20px',
    color: '#4a5568',
    marginBottom: '8px',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)',
  },
  roomValue: {
    fontSize: '28px',
    color: '#2d3748',
    fontWeight: '600',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '24px 0',
  },
  resetButton: {
    height: '64px',
    padding: '0 32px',
    fontSize: '24px',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #4161ff 0%, #8d5fff 100%)',
    boxShadow: `
      0 4px 8px rgba(65, 97, 255, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.2)
    `,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  },
  countdownText: {
    color: '#4a5568',
    fontSize: '20px',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.5)',
  },
};

// Add global animations
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ClockDisplay = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div style={styles.time}>{time}</div>;
};

const KioskCheckIn = () => {
  const [bookingref, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkinDetails, setCheckInDetails] = useState({});
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  useEffect(() => {
    let timer;
    if (checkinDetails.id && countdown === null) {
      setCountdown(10);
    }
    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    if (countdown === 0) {
      resetForm();
    }
    return () => clearInterval(timer);
  }, [countdown, checkinDetails.id]);

  const resetForm = () => {
    setBookingRef("");
    setCheckInDetails({});
    setCountdown(null);
  };

  const handleCheckIn = () => {
    if (!bookingref) return;
    
    setLoading(true);
    setTimeout(() => {
      setCheckInDetails({
        name: "Room 101",
        description: "Deluxe Room with Ocean View",
        id: "R101",
        unitGroupId: "Deluxe-Suite"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>NEOM</div>
        <ClockDisplay />
      </header>

      <main style={styles.mainContent}>
        <div style={styles.card}>
          <h1 style={styles.title}>Check In</h1>
          <div style={styles.inputWrapper}>
            <input
              style={{
                ...styles.input,
                borderColor: bookingref ? 'rgba(65, 97, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)',
                boxShadow: bookingref 
                  ? 'inset 0 2px 4px rgba(65, 97, 255, 0.1), 0 1px 1px rgba(255, 255, 255, 0.8)'
                  : 'inset 0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(255, 255, 255, 0.8)',
              }}
              value={bookingref}
              onChange={(e) => setBookingRef(e.target.value)}
              placeholder="Enter Booking Reference"
            />
          </div>
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.primaryButton,
                opacity: loading ? 0.7 : 1,
                transform: loading ? 'translateY(2px)' : 'translateY(0)',
                boxShadow: loading 
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                  : `
                      0 4px 8px rgba(65, 97, 255, 0.3),
                      0 2px 4px rgba(65, 97, 255, 0.2),
                      inset 0 1px 1px rgba(255, 255, 255, 0.2)
                    `,
              }}
              onClick={handleCheckIn}
              disabled={loading}
            >
              Check In <ArrowRight size={28} />
            </button>
            <button 
              style={styles.secondaryButton}
              onClick={() => {}}
            >
              <QrCode size={28} /> Scan QR Code
            </button>
          </div>
        </div>

        <div style={styles.card}>
          {!checkinDetails.id ? (
            <div style={styles.welcomeSection}>
              <div style={styles.hotelIcon}>🏨</div>
              <h2 style={styles.welcomeTitle}>Welcome to NEOM</h2>
              <p style={styles.welcomeText}>
                Please enter your booking reference or scan your QR code to begin the check-in process
              </p>
            </div>
          ) : (
            <div style={styles.resultSection}>
              <div style={styles.resultHeader}>
                <div style={styles.hotelIcon}>🎉</div>
                <h2 style={styles.resultTitle}>Check-in Successful!</h2>
              </div>
              <div style={styles.roomDetailsContainer}>
                <div style={styles.roomDetail}>
                  <div style={styles.roomLabel}>Room Number</div>
                  <div style={styles.roomValue}>{checkinDetails.name}</div>
                </div>
                <div style={styles.roomDetail}>
                  <div style={styles.roomLabel}>Room Type</div>
                  <div style={styles.roomValue}>{checkinDetails.description}</div>
                </div>
                <div style={styles.roomDetail}>
                  <div style={styles.roomLabel}>Room ID</div>
                  <div style={styles.roomValue}>{checkinDetails.id}</div>
                </div>
                <div style={styles.roomDetail}>
                  <div style={styles.roomLabel}>Room Group</div>
                  <div style={styles.roomValue}>{checkinDetails.unitGroupId}</div>
                </div>
              </div>
              
              <div style={styles.footer}>
                <button 
                  style={styles.resetButton}
                  onClick={resetForm}
                >
                  <RotateCcw size={24} />
                  Check In Another Guest
                </button>
                <div style={styles.countdownText}>
                  Screen will reset in {countdown} seconds
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default KioskCheckIn;