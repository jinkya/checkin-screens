"use client";
import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    display: 'flex',
    backgroundColor: '#000',
    color: 'white',
  },
  leftSection: {
    flex: '1.5',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightSection: {
    flex: '1',
    padding: '40px 60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '300',
    letterSpacing: '-0.5px',
  },
  timeWrapper: {
    marginTop: 'auto',  // Push time to bottom
  },
  time: {
    fontSize: '64px',
    fontWeight: '300',
    marginBottom: '8px',
  },
  date: {
    fontSize: '20px',
    color: '#666',
    fontWeight: '300',
  },
  checkInSection: {
    maxWidth: '480px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '300',
    marginBottom: '40px',
  },
  inputWrapper: {
    marginBottom: '40px',
  },
  input: {
    width: '100%',
    fontSize: '18px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    paddingBottom: '12px',
    outline: 'none',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
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
    gap: '8px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  secondaryButton: {
    flex: 1,
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  successSection: {
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  detailsGrid: {
    display: 'grid',
    gap: '32px',
  },
  detailRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr',
    gap: '24px',
    padding: '16px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  label: {
    fontSize: '16px',
    color: '#666',
  },
  value: {
    fontSize: '16px',
    color: 'white',
    textAlign: 'right',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    color: '#666',
  },
  resetButton: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
  },
  countdownText: {
    fontSize: '14px',
    color: '#666',
  },
};

const KioskCheckIn = () => {
  const [bookingref, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkinDetails, setCheckInDetails] = useState(null);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
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

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }));
      setDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      }));
    };
    
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <section style={styles.leftSection}>
        <div style={styles.logo}>NEOM</div>
        <div style={styles.timeWrapper}>
          <div style={styles.time}>{time}</div>
          <div style={styles.date}>{date}</div>
        </div>
      </section>

      <section style={styles.rightSection}>
        {!checkinDetails ? (
          <div style={styles.checkInSection}>
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
                Check In
              </button>
              <button style={styles.secondaryButton}>
                <QrCode size={18} /> Scan QR
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.successSection}>
            <h1 style={styles.title}>Room Details</h1>
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
            <footer style={styles.footer}>
              <button 
                style={styles.resetButton}
                onClick={handleReset}
              >
                Check In Again
              </button>
              <div style={styles.countdownText}>
                Screen will reset in {countdown} seconds
              </div>
            </footer>
          </div>
        )}
      </section>
    </div>
  );
};

export default KioskCheckIn;