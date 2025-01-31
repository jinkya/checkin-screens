"use client"
import React, { useState, useEffect } from 'react';
import { QrCode, ArrowRight, Key, Loader2, Building2, X } from 'lucide-react';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl font-light text-slate-400">
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
  const [step, setStep] = useState(0);
  const [checkinresult, setCheckInResult] = useState("");
  const [checkindetails, setCheckInDetails] = useState({});

  const resetScreen = () => {
    setBookingRef("");
    setCheckInResult("");
    setCheckInDetails({});
    setStep(0);
  };

  const handleNext = async () => {
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
      setStep(1);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
      
      {/* Header */}
      <header className="relative p-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-slate-400" />
          <h1 className="text-4xl font-light tracking-wide text-slate-700">NEOM</h1>
        </div>
        <TimeDisplay />
      </header>

      {/* Main Content */}
      <main className="relative px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="h-1 bg-slate-200 rounded-full">
              <div 
                className="h-full bg-slate-600 rounded-full transition-all duration-500"
                style={{ width: `${(step + 1) * 50}%` }}
              />
            </div>
          </div>

          {/* Cards Container */}
          <div className="relative h-[600px]">
            {/* Welcome Card */}
            <div className={`absolute inset-0 bg-white rounded-2xl shadow-lg transition-all duration-500 
                          ${step === 0 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <div className="h-full flex flex-col p-12">
                <h2 className="text-3xl font-light text-slate-800 mb-2">Welcome</h2>
                <p className="text-slate-500 mb-12">Please enter your booking reference to begin check-in</p>
                
                <div className="flex-grow flex flex-col justify-center max-w-lg">
                  <input
                    className="w-full bg-transparent text-4xl font-light text-slate-800
                             border-b-2 border-slate-200 pb-4 mb-8
                             focus:outline-none focus:border-slate-400 transition-colors
                             placeholder:text-slate-300"
                    value={bookingref}
                    onChange={(e) => setBookingRef(e.target.value.trim())}
                    placeholder="Enter Reference"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleNext}
                      disabled={loading}
                      className="h-16 bg-slate-800 text-white rounded-xl
                               hover:bg-slate-700 transition-colors
                               flex items-center justify-center gap-3 group"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Check In
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <button
                      className="h-16 bg-white text-slate-700 rounded-xl
                               border-2 border-slate-200 hover:border-slate-300
                               transition-colors flex items-center justify-center gap-3"
                    >
                      <QrCode className="h-5 w-5" />
                      Scan QR
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Card */}
            <div className={`absolute inset-0 bg-white rounded-2xl shadow-lg transition-all duration-500
                          ${step === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="h-full flex flex-col p-12">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-3xl font-light text-slate-800 mb-2">Room Details</h2>
                    <p className="text-slate-500">Your check-in was successful</p>
                  </div>
                  <button
                    onClick={resetScreen}
                    className="flex items-center justify-center h-10 w-10 rounded-full
                             bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-grow">
                  <div className="grid gap-8">
                    {Object.entries(checkindetails).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="text-slate-500 font-light">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-xl text-slate-800 font-light">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex items-center justify-center">
                    <Key className="h-20 w-20 text-slate-300" />
                  </div>
                </div>

                <div className="text-center text-slate-400 text-sm">
                  Screen will reset in 60 seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckIn;