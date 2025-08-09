export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center text-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-red-500/50">
        <h1 className="text-3xl font-bold mb-8 text-white">RISK OF CRASH OUT METER</h1>
        
        {/* Meter Container */}
        <div className="relative w-80 h-80 mx-auto mb-6">
          {/* Meter Background */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
          
          {/* Danger Zones */}
          <div className="absolute inset-2 rounded-full border-4 border-yellow-500/30"></div>
          <div className="absolute inset-4 rounded-full border-4 border-orange-500/40"></div>
          <div className="absolute inset-6 rounded-full border-4 border-red-500/60"></div>
          
          {/* Overloaded Center */}
          <div className="absolute inset-8 rounded-full bg-red-600 border-4 border-red-400 animate-pulse shadow-lg shadow-red-500/50">
            <div className="absolute inset-2 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white font-black text-2xl animate-pulse">⚠️</span>
            </div>
          </div>
          
          {/* Needle pointing to max */}
          <div className="absolute top-1/2 left-1/2 w-1 h-32 bg-red-400 origin-bottom transform -translate-x-1/2 translate-y-full rotate-45 shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-400"></div>
          
          {/* Scale Markings */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-green-400 font-bold">SAFE</div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-yellow-400 font-bold">CAUTION</div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-400 font-bold">DANGER</div>
          <div className="absolute bottom-4 right-4 transform text-red-600 font-black animate-pulse">OVERLOAD</div>
        </div>
        
        {/* Status Display */}
        <div className="space-y-4">
          <div className="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <div className="text-red-400 font-bold text-lg mb-2">⚠️ CRITICAL WARNING ⚠️</div>
            <div className="text-red-300">Risk Level: <span className="font-black text-red-400 animate-pulse">MAXIMUM OVERLOAD</span></div>
            <div className="text-red-300">Status: <span className="font-bold text-red-400">IMMINENT CRASH OUT</span></div>
          </div>
          
          {/* Flashing indicators */}
          <div className="flex justify-center space-x-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
          
          <div className="text-red-400 text-sm font-mono animate-pulse">
            SYSTEM OVERLOAD DETECTED • IMMEDIATE ACTION REQUIRED
          </div>
        </div>
      </div>
    </main>
  );
}