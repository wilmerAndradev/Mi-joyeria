'use client';

export default function AdminSalesChart() {
  // Mock data points for an SVG polyline
  const dataPoints = [10, 25, 20, 45, 30, 60, 50, 85, 70, 95, 80, 100];
  
  // Calculate polyline points
  const max = Math.max(...dataPoints);
  const points = dataPoints
    .map((val, i) => {
      const x = (i / (dataPoints.length - 1)) * 100;
      const y = 100 - (val / max) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-white text-sm font-medium tracking-wide">Evolución de Ventas</h3>
          <p className="text-white/40 text-xs mt-1">Últimos 12 meses (MCLP)</p>
        </div>
        <select className="bg-white/[0.03] border border-white/[0.08] text-white/70 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]">
          <option>Este Año</option>
          <option>Año Pasado</option>
        </select>
      </div>

      <div className="flex-1 relative min-h-[200px]">
        {/* Y-Axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 75, 50, 25, 0].map((val) => (
            <div key={val} className="w-full border-t border-white/[0.03] relative">
              <span className="absolute -top-2.5 -left-8 text-[10px] text-white/20 font-mono">
                {val}M
              </span>
            </div>
          ))}
        </div>

        {/* Chart Container */}
        <div className="absolute inset-0 pl-4 pb-4">
          <div className="relative w-full h-full">
            <svg className="block w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Gradient definition */}
              <defs>
                <linearGradient id="goldGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <polygon
                points={`0,100 ${points} 100,100`}
                fill="url(#goldGradient)"
                className="transition-all duration-1000 ease-out"
              />
              
              {/* Line with non-scaling-stroke to prevent stretching distortion */}
              <polyline
                points={points}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-lg"
              />
            </svg>

            {/* HTML Data Points to ensure perfect circles */}
            <div className="absolute inset-0 pointer-events-none">
              {dataPoints.map((val, i) => {
                const left = (i / (dataPoints.length - 1)) * 100;
                const top = 100 - (val / max) * 100;
                return (
                  <div
                    key={i}
                    className="absolute w-2.5 h-2.5 bg-[#111114] border-[1.5px] border-[#C9A84C] rounded-full shadow-[0_0_8px_rgba(201,168,76,0.5)] z-10"
                    style={{ 
                      left: `${left}%`, 
                      top: `${top}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* X-Axis labels */}
        <div className="absolute -bottom-6 left-4 right-0 flex justify-between text-[10px] text-white/30 font-light">
          {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
