"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    color: '#2c4a46',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    height: '8vh',
    padding: '0 4vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 'calc(2vh + 1vw)',
    fontWeight: '300',
    letterSpacing: '-0.5px',
    color: '#2c4a46',
  },
  time: {
    fontSize: 'calc(1.5vh + 0.5vw)',
    color: '#94a3b8',
    fontWeight: '300',
  },
  mainContent: {
    height: '92vh',
    padding: '8vh 8vw',
    display: 'flex',
    gap: '8vw',
    alignItems: 'center',
  },
  leftSection: {
    flex: '1.2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '50vh',
  },
  title: {
    fontSize: 'calc(3vh + 1vw)',
    fontWeight: '400',
    color: '#2c4a46',
    marginBottom: '6vh',
  },
  inputSection: {
    width: '100%',
  },
  input: {
    width: '100%',
    fontSize: 'calc(1.5vh + 0.5vw)',
    padding: '1.5vh 0',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: 'transparent',
    color: '#2c4a46',
    outline: 'none',
    marginBottom: '4vh',
  },
  placeholder: {
    color: '#94a3b8',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2vh',
    width: '100%',
  },
  primaryButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1vw',
    padding: '2vh',
    fontSize: 'calc(1.5vh + 0.5vw)',
    backgroundColor: '#1a2e35',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1vw',
    padding: '2vh',
    fontSize: 'calc(1.5vh + 0.5vw)',
    backgroundColor: '#f8fafb',
    color: '#1a2e35',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  welcomeSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2vh',
    animation: 'fadeIn 0.5s ease-out',
  },
  welcomeEmoji: {
    fontSize: 'calc(4vh + 2vw)',
    marginBottom: '2vh',
  },
  welcomeTitle: {
    fontSize: 'calc(2vh + 1vw)',
    color: '#2c4a46',
    fontWeight: '400',
  },
  welcomeText: {
    fontSize: 'calc(1.2vh + 0.5vw)',
    color: '#94a3b8',
    fontWeight: '300',
    lineHeight: '1.5',
  },
  resultSection: {
    width: '100%',
    animation: 'fadeIn 0.5s ease-out',
  },
  successEmoji: {
    fontSize: 'calc(4vh + 2vw)',
    marginBottom: '2vh',
  },
  resultTitle: {
    fontSize: 'calc(2vh + 1vw)',
    color: '#2c4a46',
    fontWeight: '400',
    marginBottom: '4vh',
  },
  roomDetail: {
    marginBottom: '3vh',
    padding: '2vh',
    backgroundColor: '#f8fafb',
    borderRadius: '8px',
  },
  roomLabel: {
    fontSize: 'calc(1vh + 0.5vw)',
    color: '#94a3b8',
    marginBottom: '1vh',
  },
  roomValue: {
    fontSize: 'calc(2vh + 0.5vw)',
    color: '#2c4a46',
  },
  countdownWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2vh',
    marginTop: '4vh',
  },
  countdownText: {
    color: '#94a3b8',
    fontSize: 'calc(1vh + 0.5vw)',
  },
  resetButton: {
    marginTop: '3vh',
    padding: '1.5vh 3vh',
    fontSize: 'calc(1.2vh + 0.5vw)',
    backgroundColor: '#2c4a46',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '1vw',
    transition: 'all 0.3s ease',
  },
};

// Add global animations
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Clock component
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

  // Add global styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  // Handle countdown
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
        <div style={styles.leftSection}>
          <h1 style={styles.title}>Check In</h1>
          <div style={styles.inputSection}>
            <input
              style={styles.input}
              value={bookingref}
              onChange={(e) => setBookingRef(e.target.value)}
              placeholder="Enter Booking Reference"
            />
            <div style={styles.buttonGroup}>
              <button
                style={{
                  ...styles.primaryButton,
                  opacity: loading ? 0.7 : 1,
                }}
                onClick={handleCheckIn}
                disabled={loading}
              >
                Check In <ArrowRight size={24} />
              </button>
              <button style={styles.secondaryButton}>
                Scan QR Code
              </button>
            </div>
          </div>
        </div>

        <div style={styles.rightSection}>
          {!checkinDetails.id ? (
            <div style={styles.welcomeSection}>
              <div style={styles.welcomeEmoji}>👋</div>
              <h2 style={styles.welcomeTitle}>Welcome to NEOM</h2>
              <p style={styles.welcomeText}>
                Please enter your booking reference to check in
              </p>
            </div>
          ) : (
            <div style={styles.resultSection}>
              <div style={styles.successEmoji}>🎉</div>
              <h2 style={styles.resultTitle}>Check-in Successful!</h2>
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
              
              <div style={styles.countdownWrapper}>
                <button 
                  style={styles.resetButton}
                  onClick={resetForm}
                >
                  <RotateCcw size={20} />
                  Check In Another Guest
                </button>
                <div style={styles.countdownText}>
                  Screen will automatically reset in {countdown} seconds
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