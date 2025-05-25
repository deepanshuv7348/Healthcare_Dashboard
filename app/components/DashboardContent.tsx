"use client"

import { useState, useEffect } from "react"
import AnatomySection from "./AnatomySection"
import HealthStatusCards from "./HealthStatusCards"
import CalendarSection from "./CalendarSection"
import ActivityChart from "./ActivityChart"
import UpcomingSchedule from "./UpcomingSchedule"

export default function DashboardContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-gray-50">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48 mb-4 sm:mb-6"></div>
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-gray-50 overflow-y-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-responsive-2xl sm:text-responsive-3xl lg:text-responsive-4xl font-bold text-gray-900 animate-in slide-in-from-left duration-500">
          Dashboard
        </h1>
        <p className="text-responsive-sm sm:text-responsive-base lg:text-responsive-lg text-gray-500 mt-1 animate-in slide-in-from-left duration-500 delay-100">
          Welcome back! Here's your health overview
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="block xl:hidden space-y-4 sm:space-y-6">
        <div className="animate-in slide-in-from-bottom duration-500 delay-200">
          <CalendarSection />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="animate-in slide-in-from-left duration-500 delay-300">
            <AnatomySection />
          </div>
          <div className="animate-in slide-in-from-right duration-500 delay-300">
            <HealthStatusCards />
          </div>
        </div>
        <div className="animate-in slide-in-from-bottom duration-500 delay-400">
          <UpcomingSchedule />
        </div>
        <div className="animate-in slide-in-from-bottom duration-500 delay-500">
          <ActivityChart />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-4 animate-in slide-in-from-left duration-500 delay-200">
            <AnatomySection />
          </div>
          <div className="col-span-3 animate-in slide-in-from-bottom duration-500 delay-300">
            <HealthStatusCards />
          </div>
          <div className="col-span-5 animate-in slide-in-from-right duration-500 delay-200">
            <CalendarSection />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7 animate-in slide-in-from-left duration-500 delay-400">
            <ActivityChart />
          </div>
          <div className="col-span-5 animate-in slide-in-from-right duration-500 delay-400">
            <UpcomingSchedule />
          </div>
        </div>
      </div>
    </main>
  )
}
