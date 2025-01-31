"use client"
import React, { useState, useEffect } from 'react';
import { QrCode, ArrowRight, RefreshCw } from 'lucide-react';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-6xl font-light text-white/80">
      {time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </div>
  );
};

const FullscreenCheckIn = () => {
  const [bookingref, setBookingRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkinresult, setCheckInResult] = useState("");
  const [checkindetails, setCheckInDetails] = useState({});

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
      setCheckInResult("✓ Successfully Checked In!");
      setLoading(false);
    }, 1000);
  };

  const hasResults = Object.keys(checkindetails).length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className={`min-h-screen transition-all duration-700 
                      ${hasResults ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-black'}`}>
        <div className="min-h-screen flex flex-col p-12">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-8xl font-thin tracking-tight">NEOM</h1>
            <TimeDisplay />
          </div>

          {/* Main Content */}
          <div className="flex-grow flex items-center justify-center">
            <div className={`w-full max-w-6xl transition-all duration-700 
                           ${hasResults ? 'translate-x-0 opacity-100' : 'translate-x-0'}`}>
              {!hasResults ? (
                <div className="space-y-16">
                  <div>
                    <h2 className="text-6xl font-light mb-8 text-white/90">Check In</h2>
                    <input
                      className="w-full bg-transparent text-7xl font-light border-b-2 border-white/20 pb-6 
                               focus:outline-none focus:border-white/40 transition-colors
                               placeholder:text-white/20 text-white"
                      onChange={(e) => setBookingRef(e.target.value.trim())}
                      value={bookingref}
                      placeholder="Enter Booking Reference"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <button
                      className="h-32 bg-white/10 backdrop-blur-lg text-white text-3xl font-light
                               hover:bg-white/20 transition-colors
                               flex items-center justify-center gap-4"
                      onClick={() => checkIn()}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          Check In
                          <ArrowRight className="h-8 w-8" />
                        </>
                      )}
                    </button>

                    <button
                      className="h-32 bg-white/5 backdrop-blur-lg text-white/80 text-3xl font-light
                               hover:bg-white/10 transition-colors
                               flex items-center justify-center gap-4"
                      onClick={() => {}}
                    >
                      <QrCode className="h-8 w-8" />
                      Scan QR Code
                    </button>
                  </div>

                  {checkinresult && !hasResults && (
                    <div className="text-3xl font-light text-white/80 text-center">
                      {checkinresult}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="flex justify-between items-center">
                    <h2 className="text-6xl font-light text-white/90">Room Details</h2>
                    <button
                      onClick={() => {
                        setBookingRef("");
                        setCheckInResult("");
                        setCheckInDetails({});
                      }}
                      className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 
                               text-white/80 text-2xl transition-colors"
                    >
                      <RefreshCw className="h-6 w-6" />
                      <span>New Check-in</span>
                    </button>
                  </div>
                  
                  <div className="grid gap-8">
                    {Object.entries(checkindetails).map(([key, value]) => (
                      <div key={key} 
                           className="flex items-center justify-between border-b border-white/10 pb-8">
                        <div className="text-2xl font-light text-white/60">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-4xl font-light text-white">
                          {value}
                        </div>
                      </div>
                    ))}

                    <div className="text-center text-3xl font-light text-white/80 mt-8">
                      {checkinresult}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenCheckIn;