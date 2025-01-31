"use client";
import React, { useState, useEffect } from 'react';
import { AlertCircle, QrCode, Camera, X, RotateCcw } from 'lucide-react';

// Embedded styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: '#e5e7eb',
  },
  navbar: {
    backgroundColor: '#1f2937',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  navbarContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  navbarTitle: {
    color: '#f3f4f6',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: '#1f2937',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    border: '1px solid #374151',
    animation: 'fadeIn 0.5s ease-out',
  },
  inputGroup: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    color: '#f3f4f6',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.25rem',
    backgroundColor: '#374151',
    border: '2px solid #4b5563',
    borderRadius: '0.5rem',
    color: '#f3f4f6',
    transition: 'all 0.3s ease',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  button: {
    flex: 1,
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#4b5563',
    color: 'white',
  },
  alert: {
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    backgroundColor: '#374151',
    borderLeft: '4px solid #3b82f6',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    animation: 'slideIn 0.5s ease-out',
  },
  successAlert: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderLeftColor: '#10b981',
  },
  alertText: {
    color: '#f3f4f6',
    fontSize: '1.25rem',
  },
  roomDetails: {
    marginTop: '2rem',
    animation: 'fadeIn 0.5s ease-out',
  },
  roomDetailsTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#f3f4f6',
    marginBottom: '1rem',
  },
  roomDetailsList: {
    display: 'grid',
    gap: '1rem',
  },
  roomDetailItem: {
    fontSize: '1.25rem',
    color: '#e5e7eb',
  },
  countdown: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.25rem',
    color: '#9ca3af',
  },
  qrScanner: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  qrScannerContent: {
    backgroundColor: '#1f2937',
    padding: '2rem',
    borderRadius: '0.5rem',
    maxWidth: '600px',
    width: '100%',
    margin: '0 1rem',
    border: '1px solid #374151',
  },
  scannerViewport: {
    position: 'relative',
    width: '100%',
    height: '400px',
    backgroundColor: '#111827',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  },
  spinner: {
    width: '1.5rem',
    height: '1.5rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add global styles for animations
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const NewNavbar = () => (
  <nav style={styles.navbar}>
    <div style={styles.navbarContent}>
      <span style={styles.navbarTitle}>NEOM Check-In</span>
    </div>
  </nav>
);

const QRScanner = ({ onScan, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onScan("BOOKING123");
    }, 3000);
    return () => clearTimeout(timer);
  }, [onScan]);

  return (
    <div style={styles.qrScanner}>
      <div style={styles.qrScannerContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f3f4f6' }}>
            QR Code Scanner
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
            <X size={32} />
          </button>
        </div>
        <div style={styles.scannerViewport}>
          <Camera size={64} color="#4b5563" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#9ca3af', fontSize: '1.25rem' }}>
          Position the QR code within the frame to scan
        </div>
      </div>
    </div>
  );
};

const CheckIn = () => {
  const [bookingref, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [startCheckin, setStartCheckin] = useState(false);
  const [checkinresult, setCheckInResult] = useState("");
  const [checkindetails, setCheckInDetails] = useState({});
  const [showScanner, setShowScanner] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // Add global styles to document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  useEffect(() => {
    let timer;
    if (checkindetails.id && countdown === null) {
      setCountdown(10);
    }
    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    if (countdown === 0) {
      resetForm();
    }
    return () => clearInterval(timer);
  }, [countdown, checkindetails.id]);

  useEffect(() => {
    if (startCheckin) {
      checkIn();
    }
  }, [startCheckin]);

  const handleScan = (result) => {
    setBookingRef(result);
    setShowScanner(false);
    setStartCheckin(true);
  };

  const resetForm = () => {
    setBookingRef("");
    setCheckInDetails({});
    setCheckInResult("");
    setCountdown(null);
    setStartCheckin(false);
  };

  const checkIn = async () => {
    if (bookingref === "") {
      setCheckInResult("Please enter a valid booking reference");
      return;
    }
    
    setLoading(true);
    // Simulating API call with timeout
    setTimeout(() => {
      setCheckInDetails({
        name: "Room 101",
        description: "Deluxe Room with Ocean View",
        id: "R101",
        unitGroupId: "Deluxe-Suite"
      });
      setCheckInResult("Successfully Checked In!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <NewNavbar />
      <div style={styles.mainContent}>
        <div style={styles.card}>
          {!checkindetails.id ? (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Please enter your booking reference:
                </label>
                <input
                  style={styles.input}
                  onChange={(e) => setBookingRef(e.target.value.trim())}
                  value={bookingref}
                  placeholder="Enter booking reference"
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={() => checkIn()}
                  disabled={loading}
                >
                  {loading ? (
                    <div style={styles.spinner} />
                  ) : (
                    'Check In'
                  )}
                </button>

                <button
                  style={{ ...styles.button, ...styles.secondaryButton }}
                  onClick={() => {
                    setShowScanner(true);
                    setCheckInDetails({});
                    setStartCheckin(false);
                    setCheckInResult("");
                  }}
                >
                  <QrCode size={24} />
                  Scan QR Code
                </button>
              </div>
            </>
          ) : (
            <div>
              <div style={{ ...styles.alert, ...styles.successAlert }}>
                <AlertCircle size={32} color="#10b981" />
                <p style={styles.alertText}>{checkinresult}</p>
              </div>

              <div style={styles.roomDetails}>
                <h3 style={styles.roomDetailsTitle}>Room Details:</h3>
                <div style={styles.roomDetailsList}>
                  <p style={styles.roomDetailItem}>
                    <strong>Room Number:</strong> {checkindetails.name}
                  </p>
                  <p style={styles.roomDetailItem}>
                    <strong>Description:</strong> {checkindetails.description}
                  </p>
                  <p style={styles.roomDetailItem}>
                    <strong>Room ID:</strong> {checkindetails.id}
                  </p>
                  <p style={styles.roomDetailItem}>
                    <strong>Room Group:</strong> {checkindetails.unitGroupId}
                  </p>
                </div>
              </div>

              <div style={styles.countdown}>
                <p>This screen will reset in {countdown} seconds</p>
                <button
                  style={{ ...styles.button, ...styles.primaryButton, margin: '1rem auto' }}
                  onClick={resetForm}
                >
                  <RotateCcw size={24} />
                  Check In Another Guest
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showScanner && (
        <QRScanner 
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};

export default CheckIn;