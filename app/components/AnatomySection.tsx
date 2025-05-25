"use client"

import { useState, useEffect } from "react"

interface HealthIndicator {
  id: string
  label: string
  status: string
  position: { top: string; left: string }
  color: string
  value: number
}

export default function AnatomySection() {
  const [healthIndicators, setHealthIndicators] = useState<HealthIndicator[]>([])
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null)

  useEffect(() => {
    import("../data/mockData.json").then((data) => {
      setHealthIndicators(data.healthIndicators)
    })
  }, [])

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 h-full transition-all duration-300 hover:shadow-md">
      <div className="relative flex justify-center items-center h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
        <div className="relative w-32 sm:w-48 md:w-56 lg:w-64 h-48 sm:h-72 md:h-80 lg:h-96">
          <img
            src="/images/anatomy-figure.png"
            alt="Human Anatomy"
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDI1MCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEyNSIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LXNpemU9IjE0Ij5BbmF0b215IEZpZ3VyZTwvdGV4dD4KPC9zdmc+"
            }}
          />

          {healthIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                top: indicator.position.top,
                left: indicator.position.left,
              }}
              onClick={() => setSelectedIndicator(selectedIndicator === indicator.id ? null : indicator.id)}
            >
              <div
                className={`px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full text-white text-responsive-xs sm:text-responsive-sm font-medium shadow-lg whitespace-nowrap transition-all duration-300 hover:scale-110 ${
                  selectedIndicator === indicator.id ? "ring-2 ring-white ring-opacity-50" : ""
                }`}
                style={{ backgroundColor: indicator.color }}
              >
                {indicator.label}
              </div>
              {selectedIndicator === indicator.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-2 sm:p-3 min-w-[120px] sm:min-w-[150px] z-10 animate-in slide-in-from-top-2 duration-200">
                  <div className="text-responsive-sm sm:text-responsive-base font-medium text-gray-900">
                    {indicator.label}
                  </div>
                  <div className="text-responsive-xs sm:text-responsive-sm text-gray-500 mt-1">
                    Health Score: {indicator.value}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                    <div
                      className="h-1.5 sm:h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${indicator.value}%`,
                        backgroundColor: indicator.color,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
