"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { activityData } from "../data/mockData"

// Dynamically import Chart.js components with SSR disabled
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
  loading: () => (
    <div className="h-32 sm:h-40 md:h-48 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading chart...</div>
    </div>
  ),
})

// Chart.js registration component
const ChartRegistration = dynamic(
  () =>
    import("chart.js").then((ChartJS) => {
      const { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } = ChartJS
      Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
      return () => null
    }),
  { ssr: false },
)

export default function ActivityFeed() {
  const [chartOptions, setChartOptions] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Set chart options only on client side
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#374151",
          titleColor: "#F9FAFB",
          bodyColor: "#F9FAFB",
          borderColor: "#6B7280",
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#6B7280",
            font: {
              size: typeof window !== "undefined" && window.innerWidth < 640 ? 10 : 12,
            },
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
    }

    setChartOptions(options)
  }, [])

  if (!isClient) {
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Activity</h2>
          <span className="text-xs sm:text-sm text-gray-500">
            {activityData.weeklyAppointments} appointments on this week
          </span>
        </div>
        <div className="h-32 sm:h-40 md:h-48 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading chart...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <ChartRegistration />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Activity</h2>
        <span className="text-xs sm:text-sm text-gray-500">
          {activityData.weeklyAppointments} appointments on this week
        </span>
      </div>

      <div className="h-32 sm:h-40 md:h-48">
        {chartOptions && <Bar data={activityData.chartData} options={chartOptions} />}
      </div>
    </div>
  )
}
