"use client";
import React, { useState, useEffect } from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafb',
    color: '#2c4a46',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    padding: '2rem 4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: '400',
    color: '#2c4a46',
  },
  time: {
    fontSize: '1.5rem',
    color: '#2c4a46',
  },
  mainContent: {
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '400',
    color: '#2c4a46',
    marginBottom: '4rem',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '800px',
  },
  inputLabel: {
    fontSize: '2.5rem',
    fontWeight: '300',
    color: '#94a3b8',
  },
  input: {
    fontSize: '1.5rem',
    padding: '1rem 0',
    border: 'none',
    borderBottom: '2px solid #e2e8f0',
    backgroundColor: 'transparent',
    color: '#2c4a46',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '2rem',
    marginTop: '4rem',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem 3rem',
    fontSize: '1.5rem',
    backgroundColor: '#2c4a46',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem 3rem',
    fontSize: '1.5rem',
    backgroundColor: 'white',
    color: '#2c4a46',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  successContent: {
    maxWidth: '800px',
    animation: 'fadeIn 0.5s ease-out',
  },
  roomDetails: {
    display: 'grid',
    gap: '2rem',
    fontSize: '1.5rem',
    color: '#2c4a46',
  },
  countdown: {
    marginTop: '4rem',
    fontSize: '1.25rem',
    color: '#94a3b8',
    textAlign: 'center',
  },
};

// Add global animations
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Clock = () => {
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

const CheckIn = () => {
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
        <Clock />
      </header>

      <main style={styles.mainContent}>
        <h1 style={styles.title}>Check In</h1>

        {!checkinDetails.id ? (
          <div style={styles.inputContainer}>
            <label style={styles.inputLabel}>
              Enter Booking Reference
            </label>
            <input
              style={styles.input}
              value={bookingref}
              onChange={(e) => setBookingRef(e.target.value)}
              placeholder=""
            />
            <div style={styles.buttonGroup}>
              <button
                style={{
                  ...styles.primaryButton,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'default' : 'pointer'
                }}
                onClick={handleCheckIn}
                disabled={loading}
              >
                Check In <ArrowRight size={24} />
              </button>
              <button style={styles.secondaryButton}>
                <QrCode size={24} /> Scan QR
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.successContent}>
            <div style={styles.roomDetails}>
              <p><strong>Room:</strong> {checkinDetails.name}</p>
              <p><strong>Type:</strong> {checkinDetails.description}</p>
              <p><strong>ID:</strong> {checkinDetails.id}</p>
            </div>
            {countdown && (
              <div style={styles.countdown}>
                Screen will reset in {countdown} seconds
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckIn;