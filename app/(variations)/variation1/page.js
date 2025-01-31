"use client";
import React, { useState, useEffect } from 'react';
import { AlertCircle, QrCode, Camera, X, RotateCcw } from 'lucide-react';
import styles from './CheckIn.module.css';

const NewNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <span className={styles.navbarTitle}>NEOM Check-In</span>
      </div>
    </nav>
  );
};

const QRScanner = ({ onScan, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onScan("BOOKING123");
    }, 3000);
    return () => clearTimeout(timer);
  }, [onScan]);

  return (
    <div className={styles.qrScanner}>
      <div className={styles.qrScannerContent}>
        <div className={styles.qrScannerHeader}>
          <h3 className={styles.qrScannerTitle}>QR Code Scanner</h3>
          <button 
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={32} />
          </button>
        </div>
        
        <div className={styles.scannerViewport}>
          <div className={styles.scannerOverlay}>
            <Camera size={64} color="#9ca3af" />
          </div>
          <div className={styles.scannerOverlay}>
            <div className={styles.scanFrame}>
              <div className={`${styles.scanCorner} ${styles.topLeft}`} />
              <div className={`${styles.scanCorner} ${styles.topRight}`} />
              <div className={`${styles.scanCorner} ${styles.bottomLeft}`} />
              <div className={`${styles.scanCorner} ${styles.bottomRight}`} />
            </div>
          </div>
          <div className={styles.scanningLine} />
        </div>
        
        <div className={styles.scannerInstructions}>
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
    <div className={styles.container}>
      <NewNavbar />
      <div className={styles.mainContent}>
        <div className={styles.card}>
          {!checkindetails.id ? (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Please enter your booking reference:
                </label>
                <input
                  className={styles.input}
                  onChange={(e) => setBookingRef(e.target.value.trim())}
                  value={bookingref}
                  placeholder="Enter booking reference"
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={() => checkIn()}
                  disabled={loading}
                >
                  {loading ? (
                    <div className={styles.spinner} />
                  ) : (
                    'Check In'
                  )}
                </button>

                <button
                  className={`${styles.button} ${styles.secondaryButton}`}
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
              <div className={`${styles.alert} ${styles.successAlert}`}>
                <AlertCircle size={32} color="#10b981" />
                <p className={styles.alertText}>{checkinresult}</p>
              </div>

              <div className={styles.roomDetails}>
                <h3 className={styles.roomDetailsTitle}>Room Details:</h3>
                <div className={styles.roomDetailsList}>
                  <p className={styles.roomDetailItem}>
                    <strong>Room Number:</strong> {checkindetails.name}
                  </p>
                  <p className={styles.roomDetailItem}>
                    <strong>Description:</strong> {checkindetails.description}
                  </p>
                  <p className={styles.roomDetailItem}>
                    <strong>Room ID:</strong> {checkindetails.id}
                  </p>
                  <p className={styles.roomDetailItem}>
                    <strong>Room Group:</strong> {checkindetails.unitGroupId}
                  </p>
                </div>
              </div>

              <div className={styles.countdown}>
                <p>This screen will reset in {countdown} seconds</p>
                <button
                  onClick={resetForm}
                  className={`${styles.button} ${styles.primaryButton} ${styles.resetButton}`}
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