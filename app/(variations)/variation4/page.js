"use client";
import React, { useState, useEffect } from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f8fafb',
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
    backgroundColor: 'white',
    borderBottom: '1px solid #eee',
  },
  logo: {
    fontSize: 'calc(2vh + 1vw)',
    fontWeight: '400',
    color: '#2c4a46',
  },
  time: {
    fontSize: 'calc(1.5vh + 0.5vw)',
    color: '#2c4a46',
  },
  mainContent: {
    height: '92vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4vh 4vw',
  },
  title: {
    fontSize: 'calc(3vh + 1vw)',
    fontWeight: '400',
    color: '#2c4a46',
    margin: '2vh 0 4vh 0',
  },
  inputSection: {
    width: '90vw',
    maxWidth: '1200px',
    backgroundColor: 'white',
    padding: '4vh 4vw',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  inputLabel: {
    fontSize: 'calc(2vh + 0.5vw)',
    fontWeight: '300',
    color: '#94a3b8',
    marginBottom: '2vh',
    display: 'block',
  },
  input: {
    width: '100%',
    fontSize: 'calc(1.5vh + 0.5vw)',
    padding: '1.5vh 0',
    border: 'none',
    borderBottom: '2px solid #e2e8f0',
    backgroundColor: 'transparent',
    color: '#2c4a46',
    outline: 'none',
    marginBottom: '4vh',
  },
  buttonGroup: {
    display: 'flex',
    gap: '2vw',
  },
  primaryButton: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1vw',
    padding: '2vh 2vw',
    fontSize: 'calc(1.5vh + 0.5vw)',
    backgroundColor: '#2c4a46',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  secondaryButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1vw',
    padding: '2vh 2vw',
    fontSize: 'calc(1.5vh + 0.5vw)',
    backgroundColor: 'white',
    color: '#2c4a46',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  successContent: {
    width: '90vw',
    maxWidth: '1200px',
    backgroundColor: 'white',
    padding: '4vh 4vw',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  roomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '3vh 3vw',
    marginBottom: '4vh',
  },
  roomItem: {
    padding: '2vh 2vw',
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
    fontWeight: '500',
  },
  countdown: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 'calc(1.2vh + 0.5vw)',
  },
  resetButton: {
    display: 'block',
    width: '50%',
    margin: '2vh auto 0',
    padding: '1.5vh 2vw',
    fontSize: 'calc(1.2vh + 0.5vw)',
    backgroundColor: '#2c4a46',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

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

const RoomDetail = ({ label, value }) => (
  <div style={styles.roomItem}>
    <div style={styles.roomLabel}>{label}</div>
    <div style={styles.roomValue}>{value}</div>
  </div>
);

const CheckIn = () => {
  const [bookingref, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkinDetails, setCheckInDetails] = useState({});
  const [countdown, setCountdown] = useState(null);

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
          <div style={styles.inputSection}>
            <label style={styles.inputLabel}>
              Enter Booking Reference
            </label>
            <input
              style={styles.input}
              value={bookingref}
              onChange={(e) => setBookingRef(e.target.value)}
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
                <QrCode size={24} /> Scan QR
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.successContent}>
            <div style={styles.roomGrid}>
              <RoomDetail label="Room Number" value={checkinDetails.name} />
              <RoomDetail label="Room Type" value={checkinDetails.description} />
              <RoomDetail label="Room ID" value={checkinDetails.id} />
              <RoomDetail label="Room Group" value={checkinDetails.unitGroupId} />
            </div>
            {countdown && (
              <div style={styles.countdown}>
                <div>Screen will reset in {countdown} seconds</div>
                <button style={styles.resetButton} onClick={resetForm}>
                  Check In Another Guest
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckIn;