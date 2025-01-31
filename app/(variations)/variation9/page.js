"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, QrCode, Building2, X } from 'lucide-react';

const styles = {
  container: {
    width: '1776px',
    height: '892px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '80px',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#666',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '400',
  },
  time: {
    fontSize: '18px',
    color: '#666',
  },
  decorativeLine: {
    width: '100%',
    maxWidth: '800px',
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '0 auto',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 20px',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '800px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '400',
    color: '#111',
    marginBottom: '16px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '48px',
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: '32px',
  },
  input: {
    width: '100%',
    height: '56px',
    fontSize: '18px',
    color: '#111',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #e5e7eb',
    outline: 'none',
    textAlign: 'center',
    '::placeholder': {
      color: '#999',
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  primaryButton: {
    height: '56px',
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#1a2e35',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  secondaryButton: {
    height: '56px',
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'white',
    color: '#111',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  successContent: {
    width: '100%',
    maxWidth: '800px',
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '32px',
  },
  closeIcon: {
    color: '#666',
    cursor: 'pointer',
  },
  detailsGrid: {
    display: 'grid',
    gap: '32px',
    marginTop: '32px',
  },
  detailRow: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '40px',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  label: {
    fontSize: '16px',
    color: '#666',
  },
  value: {
    fontSize: '16px',
    color: '#111',
    textAlign: 'right',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '64px',
    color: '#666',
    fontSize: '14px',
  },
  keyIcon: {
    opacity: 0.5,
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

  const handleReset = () => {
    setBookingRef("");
    setCheckInDetails(null);
    setCountdown(60);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoWrapper}>
          <Building2 size={24} />
          <div style={styles.logo}>NEOM</div>
        </div>
        <ClockDisplay />
      </header>

      <div style={styles.decorativeLine} />

      <main style={styles.content}>
        {!checkinDetails ? (
          <div style={styles.contentWrapper}>
            <h1 style={styles.title}>Welcome</h1>
            <p style={styles.subtitle}>
              Please enter your booking reference to begin check-in
            </p>
            <div style={styles.inputWrapper}>
              <input
                style={styles.input}
                value={bookingref}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="Enter Reference"
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
        ) : (
          <div style={styles.successContent}>
            <div style={styles.closeButton}>
              <X size={24} style={styles.closeIcon} onClick={handleReset} />
            </div>
            <h1 style={styles.title}>Room Details</h1>
            <p style={styles.subtitle}>Your check-in was successful</p>
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
              <Building2 size={20} style={styles.keyIcon} />
              Screen will reset in {countdown} seconds
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default KioskCheckIn;