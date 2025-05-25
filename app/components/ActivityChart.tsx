"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp } from "lucide-react"

interface ChartDataItem {
  day: string
  value: number
  appointments: string[]
}

export default function ActivityChart() {
  const [mounted, setMounted] = useState(false)
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [weeklyAppointments, setWeeklyAppointments] = useState(0)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    import("../data/mockData.json").then((data) => {
      setChartData(data.activityData.chartData)
      setWeeklyAppointments(data.activityData.weeklyAppointments)
    })
  }, [])

  const maxValue = Math.max(...chartData.map((d) => d.value))

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 mb-4 sm:mb-6"></div>
          <div className="h-24 sm:h-32 md:h-40 lg:h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 space-y-1 sm:space-y-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-semibold text-gray-900">
            Activity
          </h2>
        </div>
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
          <span className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base text-gray-500">
            {weeklyAppointments} appointments this week
          </span>
        </div>
      </div>

      <div className="h-24 sm:h-32 md:h-40 lg:h-48 flex items-end justify-between space-x-1 sm:space-x-2 lg:space-x-4 relative">
        {chartData.map((item, index) => (
          <div
            key={item.day}
            className="flex flex-col items-center flex-1 relative"
            onMouseEnter={() => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="w-full flex justify-center mb-1 sm:mb-2 relative">
              <div
                className={`w-4 sm:w-6 lg:w-8 rounded-t transition-all duration-700 ease-out cursor-pointer hover:opacity-80 ${
                  index % 2 === 0 ? "bg-cyan-400" : "bg-blue-600"
                }`}
                style={{
                  height: `${(item.value / maxValue) * 80}px`,
                  animationDelay: `${index * 100}ms`,
                  transform: hoveredBar === index ? "scale(1.1)" : "scale(1)",
                }}
              ></div>

              {hoveredBar === index && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-responsive-xs sm:text-responsive-sm rounded-lg p-1.5 sm:p-2 min-w-[80px] sm:min-w-[120px] z-10 animate-in slide-in-from-bottom-2 duration-200">
                  <div className="font-medium">{item.day}</div>
                  <div className="text-gray-300">{item.value} appointments</div>
                  <div className="mt-1 space-y-0.5 sm:space-y-1">
                    {item.appointments.slice(0, 2).map((apt, i) => (
                      <div key={i} className="text-responsive-xs text-gray-400 truncate">
                        {apt}
                      </div>
                    ))}
                    {item.appointments.length > 2 && (
                      <div className="text-responsive-xs text-gray-400">+{item.appointments.length - 2} more</div>
                    )}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
            <span className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base text-gray-600 font-medium transition-colors duration-200 hover:text-gray-900 truncate">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-responsive-sm sm:text-responsive-base">
          <span className="text-gray-500">Total this week</span>
          <span className="font-semibold text-gray-900">
            {chartData.reduce((sum, item) => sum + item.value, 0)} appointments
          </span>
        </div>
      </div>
    </div>
  )
}
