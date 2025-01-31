"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, QrCode, RotateCcw } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    background: '#f6f9fc',
    color: '#2c4a46',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    height: '80px',
    padding: '0 48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    borderBottom: '1px solid rgba(44, 74, 70, 0.1)',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '500',
    color: '#2c4a46',
    letterSpacing: '-0.5px',
  },
  time: {
    fontSize: '24px',
    color: '#64748b',
    fontWeight: '400',
  },
  mainContent: {
    flex: 1,
    height: '812px', // 892px - 80px header
    padding: '40px',
    display: 'grid',
    gridTemplateColumns: '860px 860px',
    gap: '16px',
    justifyContent: 'center',
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    height: '732px', // 812px - 80px padding
    padding: '48px',
    boxShadow: '0 4px 6px rgba(44, 74, 70, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    fontSize: '48px',
    fontWeight: '500',
    color: '#2c4a46',
    marginBottom: '64px',
  },
  inputWrapper: {
    marginBottom: '48px',
  },
  input: {
    width: '100%',
    height: '72px',
    fontSize: '24px',
    padding: '0 24px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    backgroundColor: '#f8fafc',
    color: '#2c4a46',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginTop: 'auto',
  },
  primaryButton: {
    height: '72px',
    fontSize: '24px',
    backgroundColor: '#2c4a46',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    transition: 'all 0.2s ease',
  },
  secondaryButton: {
    height: '72px',
    fontSize: '24px',
    backgroundColor: '#f8fafc',
    color: '#2c4a46',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
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
  partyEmoji: {
    fontSize: '72px',
    marginBottom: '32px',
  },
  welcomeTitle: {
    fontSize: '40px',
    color: '#2c4a46',
    fontWeight: '500',
    marginBottom: '24px',
  },
  welcomeText: {
    fontSize: '24px',
    color: '#64748b',
    lineHeight: '1.5',
    maxWidth: '600px',
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
    color: '#2c4a46',
    fontWeight: '500',
    marginTop: '24px',
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
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '24px',
    border: '2px solid #e2e8f0',
  },
  roomLabel: {
    fontSize: '20px',
    color: '#64748b',
    marginBottom: '8px',
  },
  roomValue: {
    fontSize: '28px',
    color: '#2c4a46',
    fontWeight: '500',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  resetButton: {
    height: '64px',
    padding: '0 32px',
    fontSize: '24px',
    backgroundColor: '#2c4a46',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
  },
  countdownText: {
    color: '#64748b',
    fontSize: '20px',
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
          <div style={styles.formContainer}>
            <h1 style={styles.title}>Check In</h1>
            <div style={styles.inputWrapper}>
              <input
                style={{
                  ...styles.input,
                  borderColor: bookingref ? '#2c4a46' : '#e2e8f0',
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
                }}
                onClick={handleCheckIn}
                disabled={loading}
              >
                Check In <ArrowRight size={28} />
              </button>
              <button style={styles.secondaryButton}>
                <QrCode size={28} /> Scan QR Code
              </button>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          {!checkinDetails.id ? (
            <div style={styles.welcomeSection}>
              <div style={styles.partyEmoji}>👋</div>
              <h2 style={styles.welcomeTitle}>Welcome to NEOM</h2>
              <p style={styles.welcomeText}>
                Please enter your booking reference or scan your QR code to begin the check-in process
              </p>
            </div>
          ) : (
            <div style={styles.resultSection}>
              <div style={styles.resultHeader}>
                <div style={styles.partyEmoji}>🎉</div>
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