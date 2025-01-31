"use client"
import React, { useState, useEffect } from 'react';
import { Power, QrCode, RotateCcw } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  mainWrapper: {
    height: '100%',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '48px',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    fontSize: '32px',
    color: '#ffffff',
    fontWeight: '400',
  },
  divider: {
    height: '24px',
    width: '1px',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  subTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '16px',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '16px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '32px',
  },
  loginContainer: {
    width: '100%',
    maxWidth: '480px',
    textAlign: 'center',
  },
  title: {
    fontSize: '42px',
    color: '#ffffff',
    fontWeight: '300',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '48px',
  },
  inputWrapper: {
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    height: '64px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '0 24px',
    fontSize: '18px',
    color: '#ffffff',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
  },
  primaryButton: {
    flex: 1,
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  secondaryButton: {
    flex: 1,
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  splitView: {
    display: 'flex',
    gap: '32px',
    flex: 1,
    marginTop: '32px',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  rightPanel: {
    width: '45%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '32px',
    color: '#ffffff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  statusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  statusTitle: {
    fontSize: '24px',
    fontWeight: '300',
    color: '#ffffff',
  },
  resetButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  statusGrid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  statusLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '16px',
  },
  statusValue: {
    color: '#ffffff',
    fontSize: '16px',
  },
  successMessage: {
    marginTop: '32px',
    textAlign: 'center',
  },
  successText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#10b981',
    fontSize: '18px',
    marginBottom: '8px',
  },
  indicator: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
  },
  countdownText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
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
      <div style={styles.mainWrapper}>
        <header style={styles.header}>
          <div style={styles.logoSection}>
            <div style={styles.logo}>NEOM</div>
            <div style={styles.divider} />
            <div style={styles.subTitle}>Check-in Kiosk</div>
          </div>
          <ClockDisplay />
        </header>

        {!checkinDetails ? (
          <div style={styles.mainContent}>
            <div style={styles.loginContainer}>
              <h1 style={styles.title}>Welcome</h1>
              <p style={styles.subtitle}>Please enter your booking reference or scan QR code</p>
              
              <div style={styles.inputWrapper}>
                <input
                  style={styles.input}
                  value={bookingref}
                  onChange={(e) => setBookingRef(e.target.value)}
                  placeholder="Enter booking reference"
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={handleInitialize}
                  disabled={loading}
                  style={{
                    ...styles.primaryButton,
                    opacity: loading ? 0.5 : 1,
                  }}
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
          </div>
        ) : (
          <div style={styles.splitView}>
            <div style={styles.leftPanel}>
              <h2 style={styles.statusTitle}>Check-in Details</h2>
              
              <div style={{ opacity: 0.5, marginTop: '32px' }}>
                <div style={styles.inputWrapper}>
                  <input
                    style={styles.input}
                    value={bookingref}
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

            <div style={styles.rightPanel}>
              <div style={styles.statusHeader}>
                <h2 style={styles.statusTitle}>System Status</h2>
                <button 
                  onClick={handleReset}
                  style={styles.resetButton}
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>

              <div style={styles.statusGrid}>
                {Object.entries(checkinDetails).map(([key, value]) => (
                  <div key={key} style={styles.statusRow}>
                    <span style={styles.statusLabel}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span style={styles.statusValue}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={styles.successMessage}>
                <div style={styles.successText}>
                  <div style={styles.indicator} />
                  Check-in Successful
                </div>
                <div style={styles.countdownText}>
                  Auto reset in {countdown} seconds
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KioskCheckIn;