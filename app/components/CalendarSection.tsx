"use client"

import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { useState, useEffect } from "react"

interface CalendarData {
  [year: string]: {
    [month: string]: {
      name: string
      days: Array<{
        date: number
        appointments: string[]
      }>
    }
  }
}

interface AppointmentCard {
  id: string
  title: string
  time: string
  doctor: string
  type: string
  color: string
  icon: string
  priority: string
}

export default function CalendarSection() {
  const [calendarData, setCalendarData] = useState<CalendarData>({})
  const [appointmentCards, setAppointmentCards] = useState<AppointmentCard[]>([])
  const [currentYear, setCurrentYear] = useState(2021)
  const [currentMonth, setCurrentMonth] = useState(10)
  const [isAnimating, setIsAnimating] = useState(false)
  const [screenSize, setScreenSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md")

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  useEffect(() => {
    import("../data/mockData.json").then((data) => {
      setCalendarData(data.calendarData)
      setAppointmentCards(data.appointmentCards)
    })

    // Set up responsive screen size detection
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 480) setScreenSize("xs")
      else if (width < 640) setScreenSize("sm")
      else if (width < 768) setScreenSize("md")
      else if (width < 1024) setScreenSize("lg")
      else setScreenSize("xl")
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  const navigateMonth = (direction: "prev" | "next") => {
    if (isAnimating) return

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    if (direction === "next") {
      if (currentMonth === 12) {
        setCurrentYear(currentYear + 1)
        setCurrentMonth(1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    } else {
      if (currentMonth === 1) {
        setCurrentYear(currentYear - 1)
        setCurrentMonth(12)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }
  }

  const getMaxAppointments = () => {
    switch (screenSize) {
      case "xs":
        return 1
      case "sm":
        return 2
      case "md":
        return 2
      case "lg":
        return 3
      case "xl":
        return 3
      default:
        return 2
    }
  }

  const getDayAbbreviation = (day: string) => {
    switch (screenSize) {
      case "xs":
        return day.slice(0, 1)
      case "sm":
        return day.slice(0, 2)
      default:
        return day
    }
  }

  const formatTime = (time: string) => {
    switch (screenSize) {
      case "xs":
        return time.split(":")[0]
      case "sm":
        return time.length > 5 ? time.slice(0, 5) : time
      default:
        return time
    }
  }

  const currentMonthData = calendarData[currentYear]?.[currentMonth]
  const hasData = currentMonthData && currentMonthData.days.length > 0
  const maxAppointments = getMaxAppointments()

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
        <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-4 flex-1 min-w-0">
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <span className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base text-gray-500 flex-shrink-0">
            This Week
          </span>
          <h2
            className={`text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-semibold text-gray-900 transition-all duration-300 truncate ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            {currentMonthData?.name || "Loading..."} {currentYear}
          </h2>
        </div>
        <div className="flex items-center space-x-0.5 sm:space-x-1 lg:space-x-2 flex-shrink-0">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 sm:p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
            disabled={isAnimating}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 sm:p-1.5 lg:p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
            disabled={isAnimating}
            aria-label="Next month"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
      >
        {/* Calendar Grid */}
        <div className="calendar-grid-responsive mb-3 sm:mb-4 lg:mb-6">
          {/* Day Headers */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-responsive-xs sm:text-responsive-sm lg:text-responsive-base font-medium text-gray-500 pb-1 sm:pb-2"
            >
              {getDayAbbreviation(day)}
            </div>
          ))}

          {/* Calendar Days */}
          {hasData ? (
            currentMonthData.days.map((day, index) => (
              <div
                key={day.date}
                className="calendar-day-cell text-center transition-all duration-300 hover:bg-gray-50 rounded-lg p-0.5 sm:p-1 flex flex-col"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Day Number */}
                <div className="text-responsive-sm sm:text-responsive-base lg:text-responsive-lg font-semibold text-gray-900 mb-1 flex-shrink-0">
                  {day.date}
                </div>

                {/* Appointment Times */}
                <div className="space-y-0.5 flex-1 flex flex-col justify-start overflow-hidden">
                  {day.appointments.slice(0, maxAppointments).map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className={`calendar-time-box text-white transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center rounded ${
                        timeIndex % 2 === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-500 hover:bg-purple-600"
                      }`}
                      style={{ animationDelay: `${index * 50 + timeIndex * 100}ms` }}
                      title={`Appointment at ${time}`}
                    >
                      <span className="calendar-time-text font-medium">{formatTime(time)}</span>
                    </div>
                  ))}

                  {/* Show remaining count */}
                  {day.appointments.length > maxAppointments && (
                    <div className="text-responsive-xs text-gray-500 animate-pulse py-0.5 flex items-center justify-center">
                      +{day.appointments.length - maxAppointments}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-7 text-center text-gray-500 py-6 sm:py-8">
              <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 opacity-50" />
              <p className="text-responsive-sm sm:text-responsive-base">No appointments for this month</p>
            </div>
          )}
        </div>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          {appointmentCards.map((appointment, index) => (
            <div
              key={appointment.id}
              className="p-2.5 sm:p-3 lg:p-4 rounded-lg text-white transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: appointment.color,
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span
                  className="text-sm sm:text-base lg:text-lg animate-bounce flex-shrink-0"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {appointment.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <h3 className="font-semibold text-responsive-sm sm:text-responsive-base lg:text-responsive-lg truncate">
                      {appointment.title}
                    </h3>
                    <span
                      className={`text-responsive-xs sm:text-responsive-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0 ${
                        appointment.priority === "high"
                          ? "bg-red-500"
                          : appointment.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    >
                      {appointment.priority}
                    </span>
                  </div>
                  <p className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base opacity-90 mb-0.5 sm:mb-1 lg:mb-2 truncate">
                    {appointment.time}
                  </p>
                  <p className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base opacity-80 truncate">
                    {appointment.doctor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
