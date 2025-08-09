'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [needleRotation, setNeedleRotation] = useState(-135); // Start at safe position
  const [isBroken, setIsBroken] = useState(false);
  const [treatCooldown, setTreatCooldown] = useState(false);
  const [showTreatEffect, setShowTreatEffect] = useState(false);

  useEffect(() => {
    const animationSequence = async () => {
      // Phase 1: Start at safe (0-2s)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 2: Move to caution (2-4s)
      setAnimationPhase(1);
      setNeedleRotation(-45);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 3: Move to danger (4-6s)
      setAnimationPhase(2);
      setNeedleRotation(45);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 4: Move to overload and break (6-8s)
      setAnimationPhase(3);
      setNeedleRotation(135);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 5: Breaking effect
      setIsBroken(true);
      setAnimationPhase(4);
    };

    animationSequence();
  }, []);

  const handleSweetTreat = () => {
    if (treatCooldown) return;
    
    setTreatCooldown(true);
    setShowTreatEffect(true);
    
    // Lower the risk level
    if (animationPhase > 0) {
      const newPhase = Math.max(0, animationPhase - 1);
      setAnimationPhase(newPhase);
      
      // Update needle position based on new phase
      const rotations = [-135, -45, 45, 135];
      setNeedleRotation(rotations[newPhase] || -135);
      
      // If we go back from broken state, fix it
      if (animationPhase >= 4 && newPhase < 4) {
        setIsBroken(false);
      }
    }
    
    // Remove treat effect after animation
    setTimeout(() => setShowTreatEffect(false), 1000);
    
    // Remove cooldown after 2 seconds
    setTimeout(() => setTreatCooldown(false), 2000);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center text-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-red-500/50">
        <h1 className="text-3xl font-bold mb-8 text-white">RISK OF CRASH OUT METER</h1>
        
        {/* Meter Container */}
        <div className="relative w-80 h-80 mx-auto mb-6">
          {/* Meter Background */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
          
          {/* Danger Zones - appear progressively */}
          <div className={`absolute inset-2 rounded-full border-4 transition-all duration-1000 ${
            animationPhase >= 1 ? 'border-yellow-500/60 shadow-yellow-500/30 shadow-lg' : 'border-gray-600/20'
          }`}></div>
          <div className={`absolute inset-4 rounded-full border-4 transition-all duration-1000 ${
            animationPhase >= 2 ? 'border-orange-500/70 shadow-orange-500/40 shadow-lg' : 'border-gray-600/20'
          }`}></div>
          <div className={`absolute inset-6 rounded-full border-4 transition-all duration-1000 ${
            animationPhase >= 3 ? 'border-red-500/80 shadow-red-500/50 shadow-lg' : 'border-gray-600/20'
          }`}></div>
          
          {/* Center - changes based on phase */}
          <div className={`absolute inset-8 rounded-full transition-all duration-1000 ${
            animationPhase >= 4 
              ? 'bg-red-600 border-4 border-red-400 animate-pulse shadow-lg shadow-red-500/50' 
              : animationPhase >= 3
              ? 'bg-red-500/50 border-4 border-red-500/70 shadow-red-500/30 shadow-md'
              : animationPhase >= 2
              ? 'bg-orange-500/30 border-4 border-orange-500/50'
              : animationPhase >= 1
              ? 'bg-yellow-500/20 border-4 border-yellow-500/40'
              : 'bg-green-500/10 border-4 border-green-500/30'
          }`}>
            {animationPhase >= 4 && (
              <div className="absolute inset-2 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white font-black text-2xl animate-pulse">⚠️</span>
              </div>
            )}
            {animationPhase === 3 && (
              <div className="absolute inset-2 rounded-full bg-red-400/50 flex items-center justify-center">
                <span className="text-red-200 font-bold text-xl">!</span>
              </div>
            )}
          </div>
          
          {/* Animated Needle */}
          <div 
            className={`absolute top-1/2 left-1/2 w-1 h-28 shadow-lg transition-all duration-1000 ease-in-out ${
              isBroken ? 'animate-pulse' : ''
            } ${
              animationPhase >= 3 ? 'bg-red-400' : 
              animationPhase >= 2 ? 'bg-orange-400' : 
              animationPhase >= 1 ? 'bg-yellow-400' : 'bg-green-400'
            }`}
            style={{ 
              transform: `translate(-50%, -100%) rotate(${needleRotation}deg)`,
              transformOrigin: 'bottom center'
            }}
          ></div>
          <div className={`absolute top-1/2 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 transition-all duration-500 ${
            animationPhase >= 3 ? 'bg-red-600 border-red-400' : 
            animationPhase >= 2 ? 'bg-orange-600 border-orange-400' : 
            animationPhase >= 1 ? 'bg-yellow-600 border-yellow-400' : 'bg-green-600 border-green-400'
          }`}></div>
          
          {/* Scale Markings */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-green-400 font-bold">SAFE</div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-yellow-400 font-bold">CAUTION</div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-400 font-bold">DANGER</div>
          <div className="absolute bottom-4 right-4 transform text-red-600 font-black animate-pulse">OVERLOAD</div>
        </div>
        
        {/* Status Display */}
        <div className="space-y-4">
          {/* Status Panel - changes based on phase */}
          <div className={`rounded-lg p-4 transition-all duration-1000 ${
            animationPhase >= 4 
              ? 'bg-red-600/20 border border-red-500' 
              : animationPhase >= 3
              ? 'bg-red-500/15 border border-red-400'
              : animationPhase >= 2
              ? 'bg-orange-500/15 border border-orange-400'
              : animationPhase >= 1
              ? 'bg-yellow-500/15 border border-yellow-400'
              : 'bg-green-500/15 border border-green-400'
          }`}>
            {animationPhase >= 4 ? (
              <>
                <div className="text-red-400 font-bold text-lg mb-2 animate-pulse">⚠️ CRITICAL WARNING ⚠️</div>
                <div className="text-red-300">Risk Level: <span className="font-black text-red-400 animate-pulse">MAXIMUM OVERLOAD</span></div>
                <div className="text-red-300">Status: <span className="font-bold text-red-400">IMMINENT CRASH OUT</span></div>
              </>
            ) : animationPhase >= 3 ? (
              <>
                <div className="text-red-400 font-bold text-lg mb-2">🚨 DANGER ZONE 🚨</div>
                <div className="text-red-300">Risk Level: <span className="font-bold text-red-400">HIGH RISK</span></div>
                <div className="text-red-300">Status: <span className="font-bold text-red-400">APPROACHING OVERLOAD</span></div>
              </>
            ) : animationPhase >= 2 ? (
              <>
                <div className="text-orange-400 font-bold text-lg mb-2">⚠️ WARNING ⚠️</div>
                <div className="text-orange-300">Risk Level: <span className="font-bold text-orange-400">ELEVATED</span></div>
                <div className="text-orange-300">Status: <span className="font-bold text-orange-400">MONITOR CLOSELY</span></div>
              </>
            ) : animationPhase >= 1 ? (
              <>
                <div className="text-yellow-400 font-bold text-lg mb-2">⚠️ CAUTION ⚠️</div>
                <div className="text-yellow-300">Risk Level: <span className="font-bold text-yellow-400">MODERATE</span></div>
                <div className="text-yellow-300">Status: <span className="font-bold text-yellow-400">INCREASING</span></div>
              </>
            ) : (
              <>
                <div className="text-green-400 font-bold text-lg mb-2">✅ SYSTEM NOMINAL</div>
                <div className="text-green-300">Risk Level: <span className="font-bold text-green-400">SAFE</span></div>
                <div className="text-green-300">Status: <span className="font-bold text-green-400">ALL SYSTEMS GO</span></div>
              </>
            )}
          </div>
          
          {/* Flashing indicators - only show when broken */}
          {animationPhase >= 4 && (
            <>
              <div className="flex justify-center space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              
              <div className="text-red-400 text-sm font-mono animate-pulse">
                SYSTEM OVERLOAD DETECTED • IMMEDIATE ACTION REQUIRED
              </div>
            </>
          )}
          
          {/* Progress indicator during animation */}
          {animationPhase < 4 && (
            <div className="text-gray-400 text-sm font-mono">
              Monitoring system status...
            </div>
          )}
        </div>
        
        {/* Sweet Treat Button */}
        <div className="mt-8 relative">
          <button
            onClick={handleSweetTreat}
            disabled={treatCooldown || animationPhase === 0}
            className={`
              px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform
              ${treatCooldown 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : animationPhase === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-pink-500/25'
              }
              ${showTreatEffect ? 'animate-bounce' : ''}
            `}
          >
            🍭 Sweet Treat 🍭
          </button>
          
          {/* Treat effect animation */}
          {showTreatEffect && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-4xl animate-ping">✨</div>
            </div>
          )}
          
          {/* Cooldown indicator */}
          {treatCooldown && (
            <div className="mt-2 text-sm text-gray-400">
              Treat cooldown: 2s
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-4 text-sm text-gray-300 max-w-md mx-auto">
            {animationPhase === 0 
              ? "Already at minimum risk! 🎉" 
              : treatCooldown
              ? "Wait for cooldown to have another treat..."
              : "Click the sweet treat to lower your crash out risk! 🍬"
            }
          </div>
        </div>
      </div>
    </main>
  );
}