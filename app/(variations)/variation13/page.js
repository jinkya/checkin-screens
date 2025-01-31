"use client"
import React, { useState, useEffect } from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-3xl font-extralight tracking-wide text-zinc-800">
      {time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
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
  const [resetTimer, setResetTimer] = useState(null);

  const RESET_TIMEOUT = 60000;

  const resetScreen = () => {
    setBookingRef("");
    setCheckInResult("");
    setCheckInDetails({});
    setStartCheckin(false);
    setShowScanner(false);
  };

  useEffect(() => {
    if (Object.keys(checkindetails).length > 0) {
      const timer = setTimeout(resetScreen, RESET_TIMEOUT);
      setResetTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [checkindetails]);

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

  const checkIn = async () => {
    if (bookingref === "") {
      setCheckInResult("Please enter a valid booking reference");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setCheckInDetails({
        name: "Room 101",
        description: "Deluxe Room with Ocean View",
        id: "R101",
        unitGroupId: "Deluxe-Suite"
      });
      setCheckInResult("Successfully checked in");
      setLoading(false);
    }, 1000);
  };

  const hasResults = Object.keys(checkindetails).length > 0;

  return (
    <div className="min-h-screen bg-neutral-50 text-zinc-800">
      <div className="min-h-screen flex transition-all duration-500">
        {/* Main Check-in Interface */}
        <div className={`p-12 flex flex-col ${hasResults ? 'w-1/2' : 'w-full'}`}>
          {/* Top Section with Logo and Time */}
          <div className="flex justify-between items-center mb-20">
            <h1 className="text-6xl font-extralight tracking-wider text-zinc-800">NEOM</h1>
            <TimeDisplay />
          </div>

          {/* Check-in Form */}
          <div className="flex-grow flex flex-col justify-start max-w-2xl mx-auto w-full">
            <div className="space-y-16">
              <div>
                <h2 className="text-4xl font-extralight mb-12 text-zinc-800">Check In</h2>
                <div className="relative">
                  <input
                    className="w-full bg-transparent text-2xl font-extralight tracking-wide
                             border-b border-zinc-200 pb-4 
                             focus:outline-none focus:border-zinc-400 transition-colors
                             placeholder:text-zinc-300 text-zinc-600"
                    onChange={(e) => setBookingRef(e.target.value.trim())}
                    value={bookingref}
                    placeholder="Enter Booking Reference"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  className="h-16 bg-zinc-900 text-zinc-50 text-xl font-extralight tracking-wide
                           hover:bg-zinc-800 transition-colors
                           flex items-center justify-center gap-3 group"
                  onClick={() => checkIn()}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-zinc-200 border-t-transparent" />
                  ) : (
                    <>
                      Check In
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <button
                  className="h-16 bg-white text-zinc-800 text-xl font-extralight tracking-wide
                           hover:bg-zinc-50 transition-colors border border-zinc-200
                           flex items-center justify-center gap-3"
                  onClick={() => {
                    setShowScanner(true);
                    setCheckInDetails({});
                    setStartCheckin(false);
                    setCheckInResult("");
                  }}
                >
                  <QrCode className="h-5 w-5" />
                  Scan QR
                </button>
              </div>

              {checkinresult && !hasResults && (
                <div className="text-xl font-extralight tracking-wide text-zinc-600">
                  {checkinresult}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        {hasResults && (
          <div className="w-1/2 bg-white p-12 flex flex-col border-l border-zinc-100">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-extralight tracking-wide text-zinc-800">Room Details</h2>
              <button
                onClick={resetScreen}
                className="text-lg font-extralight text-zinc-500 hover:text-zinc-800 tracking-wide transition-colors"
              >
                New Check-in
              </button>
            </div>
            
            <div className="flex-grow flex items-start pt-4">
              <div className="w-full space-y-8">
                {Object.entries(checkindetails).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div className="text-lg font-extralight tracking-wide text-zinc-400">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xl font-extralight tracking-wide text-zinc-800">
                      {value}
                    </div>
                  </div>
                ))}

                <div>
                  <div className="text-xl font-extralight tracking-wide text-zinc-600 mb-3">
                    {checkinresult}
                  </div>
                  <div className="text-sm font-extralight tracking-wide text-zinc-400">
                    Screen will reset in 60 seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;