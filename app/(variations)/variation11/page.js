"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, QrCode } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  header: {
    height: '80px',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#4161ff',
    fontSize: '32px',
    fontWeight: '400',
  },
  time: {
    fontSize: '18px',
    color: '#64748b',
  },
  content: {
    display: 'flex',
    height: 'calc(100% - 80px)',
  },
  leftPanel: {
    flex: 1,
    padding: '120px 80px',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: 'white',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    maxWidth: '480px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '400',
    color: '#1e293b',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    marginBottom: '40px',
  },
  inputWrapper: {
    marginBottom: '32px',
  },
  input: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '18px',
    padding: '8px 0',
    outline: 'none',
    background: 'transparent',
    color: '#1e293b',
    '::placeholder': {
      color: '#94a3b8',
    }
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
  },
  primaryButton: {
    flex: 1,
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#4161ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  secondaryButton: {
    flex: 1,
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'white',
    color: '#1e293b',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  newCheckInButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#64748b',
    fontSize: '14px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  detailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e2e8f0',
  },
  label: {
    color: '#64748b',
    fontSize: '16px',
  },
  value: {
    color: '#1e293b',
    fontSize: '16px',
  },
  successMessage: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '24px 0',
  },
  successText: {
    color: '#4161ff',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  countdownText: {
    color: '#94a3b8',
    fontSize: '14px',
  },
  checkIcon: {
    color: '#4161ff',
  }
};

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
  const [checkinDetails, setCheckInDetails] = useState(null);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer;
    if (checkinDetails && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    if (countdown === 0) {
      handleReset();
    }
    return () => clearInterval(timer);
  }, [countdown, checkinDetails]);

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
      setCountdown(60);
    }, 1000);
  };

  const handleReset = () => {
    setBookingRef("");
    setCheckInDetails(null);
    setCountdown(60);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>NEOM</div>
        <ClockDisplay />
      </header>

      <main style={styles.content}>
        <div style={styles.leftPanel}>
          <div style={styles.mainContent}>
            <h1 style={styles.title}>Check In</h1>
            <div style={styles.inputWrapper}>
              <input
                style={styles.input}
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
                Check In <ArrowRight size={18} />
              </button>
              <button style={styles.secondaryButton}>
                <QrCode size={18} /> Scan QR
              </button>
            </div>
          </div>
        </div>

        {checkinDetails && (
          <div style={styles.rightPanel}>
            <div style={styles.detailsHeader}>
              <h2 style={styles.title}>Room Details</h2>
              <button 
                style={styles.newCheckInButton}
                onClick={handleReset}
              >
                New Check-in
              </button>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailRow}>
                <div style={styles.label}>Name</div>
                <div style={styles.value}>{checkinDetails.name}</div>
              </div>
              <div style={styles.detailRow}>
                <div style={styles.label}>Description</div>
                <div style={styles.value}>{checkinDetails.description}</div>
              </div>
              <div style={styles.detailRow}>
                <div style={styles.label}>Id</div>
                <div style={styles.value}>{checkinDetails.id}</div>
              </div>
              <div style={styles.detailRow}>
                <div style={styles.label}>Unit Group Id</div>
                <div style={styles.value}>{checkinDetails.unitGroupId}</div>
              </div>
            </div>

            <div style={styles.successMessage}>
              <div style={styles.successText}>
                ✓ Successfully Checked In!
              </div>
              <div style={styles.countdownText}>
                Screen will reset in {countdown} seconds
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default KioskCheckIn;