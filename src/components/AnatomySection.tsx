import { healthIndicators } from "../data/mockData"

export default function AnatomySection() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
      <div className="relative flex justify-center items-center h-full min-h-[300px] sm:min-h-[400px]">
        <div className="relative w-48 sm:w-56 md:w-64 h-72 sm:h-80 md:h-96">
          <img src="/images/anatomy-figure.png" alt="Human Anatomy" className="w-full h-full object-contain" />

          {healthIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: indicator.position.top,
                left: indicator.position.left,
              }}
            >
              <div
                className="px-2 sm:px-3 py-1 rounded-full text-white text-xs font-medium shadow-lg whitespace-nowrap"
                style={{ backgroundColor: indicator.color }}
              >
                {indicator.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
