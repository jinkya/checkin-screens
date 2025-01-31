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
    <div className="text-4xl font-light text-gray-600 bg-white rounded-lg p-4 shadow-lg 
                    border border-gray-100 transform hover:scale-105 transition-transform">
      {time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </div>
  );
};

const SkeuomorphicCheckIn = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-6xl font-thin text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 
                           bg-clip-text text-transparent">NEOM</h1>
              <TimeDisplay />
            </div>

            <div className="flex gap-8">
              <div className="w-1/2 bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-light text-gray-700 mb-6">Check In</h2>
                    <div className="relative">
                      <input
                        className="w-full bg-white text-2xl font-light rounded-lg px-6 py-4 shadow-inner
                                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                                 placeholder:text-gray-400 text-gray-800"
                        onChange={(e) => setBookingRef(e.target.value.trim())}
                        value={bookingref}
                        placeholder="Enter Booking Reference"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 
                                    rounded-b-lg transform scale-x-0 group-focus-within:scale-x-100 transition-transform"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="group relative h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg
                               text-white text-xl font-light overflow-hidden shadow-lg
                               transform hover:-translate-y-1 transition-all"
                      onClick={() => checkIn()}
                      disabled={loading}
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"/>
                      <div className="relative flex items-center justify-center gap-3">
                        {loading ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            Check In
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </button>

                    <button
                      className="group h-16 bg-white rounded-lg text-gray-700 text-xl font-light
                               border border-gray-200 shadow-lg
                               transform hover:-translate-y-1 transition-all
                               flex items-center justify-center gap-3"
                      onClick={() => {}}
                    >
                      <QrCode className="h-6 w-6" />
                      Scan QR
                    </button>
                  </div>

                  {checkinresult && !hasResults && (
                    <div className="text-xl font-light p-4 rounded-lg bg-white shadow-lg border border-gray-100
                                  text-center text-gray-700">
                      {checkinresult}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-1/2 bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                {hasResults ? (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-light text-gray-700">Room Details</h2>
                      <button
                        onClick={() => {
                          setBookingRef("");
                          setCheckInResult("");
                          setCheckInDetails({});
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-lg
                                 text-gray-600 shadow-lg border border-gray-200
                                 transform hover:-translate-y-1 transition-all"
                      >
                        <RefreshCw className="h-5 w-5" />
                        <span>New Check-in</span>
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {Object.entries(checkindetails).map(([key, value]) => (
                        <div key={key} 
                             className="flex items-center justify-between p-4 rounded-lg
                                      bg-gradient-to-r from-gray-50 to-white
                                      shadow-lg border border-gray-100">
                          <div className="text-lg font-light text-gray-600">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-2xl font-light text-gray-800">
                            {value}
                          </div>
                        </div>
                      ))}

                      <div className="text-center text-xl font-light text-blue-600 p-4 rounded-lg
                                    bg-blue-50 shadow-inner">
                        {checkinresult}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="text-6xl transform hover:scale-110 transition-transform">🏨</div>
                    <div className="text-2xl font-light text-gray-600">Welcome to NEOM</div>
                    <div className="text-gray-400">Please enter your booking reference to check in</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeuomorphicCheckIn;