"use client"

import { useState, useEffect } from "react"
import AnatomySection from "./AnatomySection"
import HealthStatusCards from "./HealthStatusCards"
import CalendarView from "./CalendarView"
import UpcomingSchedule from "./UpcomingSchedule"
import ActivityFeed from "./ActivityFeed"

export default function DashboardMainContent() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <main className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-y-auto min-h-screen">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-6">
        <CalendarView />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnatomySection />
          <HealthStatusCards />
        </div>
        <UpcomingSchedule />
        {isClient && <ActivityFeed />}
      </div>

      {/* Desktop Layout - Matching the reference image */}
      <div className="hidden lg:block">
        {/* Top Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Left: Anatomy Section */}
          <div className="col-span-4">
            <AnatomySection />
          </div>

          {/* Middle: Health Status Cards */}
          <div className="col-span-3">
            <HealthStatusCards />
          </div>

          {/* Right: Calendar */}
          <div className="col-span-5">
            <CalendarView />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Activity Feed */}
          <div className="col-span-7">{isClient && <ActivityFeed />}</div>

          {/* Right: Upcoming Schedule */}
          <div className="col-span-5">
            <UpcomingSchedule />
          </div>
        </div>
      </div>
    </main>
  )
}
