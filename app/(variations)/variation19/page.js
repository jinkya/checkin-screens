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
    <div className="text-3xl font-bold text-indigo-600 bg-white rounded-full px-6 py-3 shadow-lg">
      {time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </div>
  );
};

const PlayfulCheckIn = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto pt-8 px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 
                         bg-clip-text text-transparent">
              NEOM
            </h1>
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 
                          rounded-full text-indigo-600 font-medium animate-bounce">
              Welcome!
            </div>
          </div>
          <TimeDisplay />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-12">
          <div className={`bg-white rounded-3xl shadow-xl p-8 transition-all duration-500
                        ${hasResults ? 'scale-95 opacity-90' : 'scale-100'}`}>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">Ready to Check In?</h2>
                <div className="relative">
                  <input
                    className="w-full bg-indigo-50 text-2xl font-medium rounded-2xl px-6 py-4
                             focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all
                             placeholder:text-indigo-300 text-indigo-900"
                    onChange={(e) => setBookingRef(e.target.value.trim())}
                    value={bookingref}
                    placeholder="Enter Booking Reference"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  className="group relative h-20 bg-gradient-to-r from-indigo-500 to-purple-500 
                           rounded-2xl overflow-hidden
                           text-white text-xl font-bold shadow-lg
                           transform hover:-translate-y-1 transition-all"
                  onClick={() => checkIn()}
                  disabled={loading}
                >
                  <div className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <div className="animate-spin rounded-full h-6 w-6 
                                    border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Let's Go!
                        <ArrowRight className="h-6 w-6" />
                      </>
                    )}
                  </div>
                </button>

                <button
                  className="group h-20 bg-white rounded-2xl text-indigo-600 text-xl font-bold
                           border-2 border-indigo-100 shadow-lg
                           transform hover:-translate-y-1 transition-all
                           flex items-center justify-center gap-3"
                  onClick={() => {}}
                >
                  <QrCode className="h-6 w-6" />
                  Scan QR
                </button>
              </div>

              {checkinresult && !hasResults && (
                <div className="text-xl font-bold text-indigo-600 text-center animate-pulse">
                  {checkinresult}
                </div>
              )}
            </div>
          </div>

          <div className={`bg-white rounded-3xl shadow-xl p-8 transition-all duration-500
                        ${hasResults ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {hasResults ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-indigo-900">Your Room is Ready! 🎉</h2>
                  <button
                    onClick={() => {
                      setBookingRef("");
                      setCheckInResult("");
                      setCheckInDetails({});
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-50 rounded-xl
                             text-indigo-600 font-bold hover:bg-indigo-100 transition-colors"
                  >
                    <RefreshCw className="h-5 w-5" />
                    <span>Start Over</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {Object.entries(checkindetails).map(([key, value]) => (
                    <div key={key} 
                         className="flex items-center justify-between p-4 rounded-xl
                                  bg-gradient-to-r from-indigo-50 to-purple-50
                                  hover:from-indigo-100 hover:to-purple-100
                                  transition-colors duration-300">
                      <div className="text-lg font-medium text-indigo-600">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-2xl font-bold text-indigo-900">
                        {value}
                      </div>
                    </div>
                  ))}

                  <div className="text-center text-xl font-bold text-indigo-600 p-4 bg-indigo-50 rounded-xl">
                    {checkinresult}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <div className="text-6xl animate-bounce">🏨</div>
                <div className="text-2xl font-bold text-indigo-900">Let's Get You Checked In!</div>
                <div className="text-indigo-600">Enter your booking reference to begin</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayfulCheckIn;