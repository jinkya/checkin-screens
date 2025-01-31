"use client"
import React, { useState, useEffect } from 'react';
import { QrCode, ArrowRight, RefreshCw, Clock } from 'lucide-react';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-3xl font-light text-gray-400">
      {time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </div>
  );
};

const DarkCheckIn = () => {
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
    <div className="min-h-screen bg-gray-900">
      <div className="min-h-screen flex transition-all duration-500">
        <div className={`p-12 flex flex-col ${hasResults ? 'w-1/2' : 'w-full'}`}>
          <div className="flex justify-between items-center mb-16">
            <h1 className="text-6xl font-thin text-white">NEOM</h1>
            <TimeDisplay />
          </div>

          <div className="flex-grow flex flex-col justify-center max-w-xl mx-auto w-full">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-light text-gray-400 mb-8">Check In</h2>
                <input
                  className="w-full bg-transparent text-4xl font-light border-b-2 border-gray-700 pb-4 
                           focus:outline-none focus:border-purple-500 transition-colors
                           placeholder:text-gray-700 text-white"
                  onChange={(e) => setBookingRef(e.target.value.trim())}
                  value={bookingref}
                  placeholder="Enter Booking Reference"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  className="h-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-light
                           hover:from-purple-700 hover:to-blue-700 transition-colors
                           flex items-center justify-center gap-3 rounded-lg"
                  onClick={() => checkIn()}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Check In
                      <ArrowRight className="h-6 w-6" />
                    </>
                  )}
                </button>

                <button
                  className="h-20 bg-gray-800 text-gray-300 text-xl font-light
                           hover:bg-gray-700 transition-colors
                           flex items-center justify-center gap-3 rounded-lg"
                  onClick={() => {}}
                >
                  <QrCode className="h-6 w-6" />
                  Scan QR
                </button>
              </div>

              {checkinresult && !hasResults && (
                <div className="text-xl font-light text-purple-400">
                  {checkinresult}
                </div>
              )}
            </div>
          </div>
        </div>

        {hasResults && (
          <div className="w-1/2 bg-gray-800 p-12 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light text-gray-300">Room Details</h2>
              <button
                onClick={() => {
                  setBookingRef("");
                  setCheckInResult("");
                  setCheckInDetails({});
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 
                         text-gray-300 rounded-lg transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                <span>New Check-in</span>
              </button>
            </div>
            
            <div className="flex-grow flex items-center">
              <div className="w-full space-y-8">
                {Object.entries(checkindetails).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b border-gray-700 pb-6">
                    <div className="text-lg font-light text-gray-400">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-light text-gray-200">
                      {value}
                    </div>
                  </div>
                ))}

                <div className="text-center text-xl font-light text-purple-400">
                  {checkinresult}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkCheckIn;