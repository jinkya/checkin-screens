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
    <div className="text-4xl font-light text-gray-400">
      {time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </div>
  );
};

const MinimalCheckIn = () => {
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
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex">
        <div className="w-full p-8 flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-thin text-gray-800">NEOM</h1>
            <TimeDisplay />
          </div>

          <div className="max-w-4xl mx-auto w-full flex-grow flex">
            <div className="w-1/2 pr-12 border-r border-gray-100 flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-light text-gray-600 mb-6">Check In</h2>
                  <input
                    className="w-full bg-transparent text-3xl font-light border-b border-gray-200 pb-3 
                             focus:outline-none focus:border-gray-400 transition-colors
                             placeholder:text-gray-300 text-gray-800"
                    onChange={(e) => setBookingRef(e.target.value.trim())}
                    value={bookingref}
                    placeholder="Enter Booking Reference"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    className="w-full h-16 bg-gray-900 text-white text-lg font-light
                             hover:bg-gray-800 transition-colors
                             flex items-center justify-center gap-3"
                    onClick={() => checkIn()}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Check In
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  <button
                    className="w-full h-16 bg-gray-50 text-gray-600 text-lg font-light
                             hover:bg-gray-100 transition-colors
                             flex items-center justify-center gap-3"
                    onClick={() => {}}
                  >
                    <QrCode className="h-5 w-5" />
                    Scan QR Code
                  </button>
                </div>

                {checkinresult && !hasResults && (
                  <div className="text-lg font-light text-gray-600">
                    {checkinresult}
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/2 pl-12 flex flex-col justify-center">
              {hasResults ? (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-light text-gray-600">Room Details</h2>
                    <button
                      onClick={() => {
                        setBookingRef("");
                        setCheckInResult("");
                        setCheckInDetails({});
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 
                               text-gray-600 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>New Check-in</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {Object.entries(checkindetails).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <div className="text-base font-light text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-xl font-light text-gray-800">
                          {value}
                        </div>
                      </div>
                    ))}

                    <div className="text-center text-lg font-light text-gray-600">
                      {checkinresult}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">👋</div>
                  <div className="text-xl font-light">Welcome to NEOM</div>
                  <div className="text-sm font-light mt-2">Please enter your booking reference to check in</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalCheckIn;