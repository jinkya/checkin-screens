"use client";
import React, { useState, useEffect } from 'react';
import { Power, QrCode, RotateCcw } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    backgroundColor: '#f8f9fa',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  hexagon: {
    color: '#10b981',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '400',
    color: '#111',
  },
  time: {
    fontSize: '18px',
    color: '#6b7280',
    padding: '8px 16px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
  },
  // Initial Login Screen
  loginContainer: {
    maxWidth: '480px',
    margin: '120px auto 0',
    padding: '48px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '400',
    color: '#111',
    marginBottom: '40px',
  },
  inputWrapper: {
    marginBottom: '40px',
  },
  input: {
    width: '100%',
    height: '56px',
    padding: '0 16px',
    fontSize: '18px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '4px',
    color: '#111',
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
  },
  primaryButton: {
    flex: 1,
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  secondaryButton: {
    flex: 1,
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: 'white',
    color: '#111',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  // Success Split View
  splitContainer: {
    display: 'flex',
    height: 'calc(100% - 96px)', // Accounting for header
  },
  leftContent: {
    flex: 1,
    padding: '48px',
  },
  rightContent: {
    width: '50%',
    backgroundColor: '#111',
    padding: '48px',
    color: 'white',
  },
  statusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '64px',
  },
  statusTitle: {
    fontSize: '32px',
    fontWeight: '400',
  },
  resetButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  statusGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statusLabel: {
    fontSize: '18px',
    color: '#9ca3af',
  },
  statusValue: {
    fontSize: '18px',
    color: 'white',
  },
  successMessage: {
    marginTop: '64px',
    textAlign: 'center',
  },
  successText: {
    color: '#10b981',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  autoResetText: {
    color: '#6b7280',
    fontSize: '16px',
  },
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

  const handleInitialize = () => {
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

  const handleReset = () => {
    setBookingRef("");
    setCheckInDetails(null);
    setCountdown(60);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoWrapper}>
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={styles.hexagon}
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          <div style={styles.logo}>NEOM</div>
        </div>
        <ClockDisplay />
      </header>

      {!checkinDetails ? (
        // Initial Login Screen
        <div style={styles.loginContainer}>
          <h1 style={styles.title}>System Login</h1>
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
              onClick={handleInitialize}
              disabled={loading}
            >
              <Power size={20} />
              Initialize
            </button>
            <button style={styles.secondaryButton}>
              <QrCode size={20} />
              Scan QR
            </button>
          </div>
        </div>
      ) : (
        // Success Split View
        <div style={styles.splitContainer}>
          <div style={styles.leftContent}>
            <div style={styles.loginContainer}>
              <h1 style={styles.title}>System Login</h1>
              <div style={styles.inputWrapper}>
                <input
                  style={styles.input}
                  value={bookingref}
                  onChange={(e) => setBookingRef(e.target.value)}
                  placeholder="Enter Booking Reference"
                  disabled
                />
              </div>
              <div style={styles.buttonGroup}>
                <button style={{...styles.primaryButton, opacity: 0.5}} disabled>
                  <Power size={20} />
                  Initialize
                </button>
                <button style={{...styles.secondaryButton, opacity: 0.5}} disabled>
                  <QrCode size={20} />
                  Scan QR
                </button>
              </div>
            </div>
          </div>
          <div style={styles.rightContent}>
            <div style={styles.statusHeader}>
              <h2 style={styles.statusTitle}>System Status</h2>
              <button 
                style={styles.resetButton}
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                Reset System
              </button>
            </div>
            <div style={styles.statusGrid}>
              <div style={styles.statusRow}>
                <div style={styles.statusLabel}>Name</div>
                <div style={styles.statusValue}>{checkinDetails.name}</div>
              </div>
              <div style={styles.statusRow}>
                <div style={styles.statusLabel}>Description</div>
                <div style={styles.statusValue}>{checkinDetails.description}</div>
              </div>
              <div style={styles.statusRow}>
                <div style={styles.statusLabel}>Id</div>
                <div style={styles.statusValue}>{checkinDetails.id}</div>
              </div>
              <div style={styles.statusRow}>
                <div style={styles.statusLabel}>Unit Group Id</div>
                <div style={styles.statusValue}>{checkinDetails.unitGroupId}</div>
              </div>
            </div>
            <div style={styles.successMessage}>
              <div style={styles.successText}>
                ✓ Successfully Checked In!
              </div>
              <div style={styles.autoResetText}>
                Auto reset: {countdown} seconds
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KioskCheckIn;