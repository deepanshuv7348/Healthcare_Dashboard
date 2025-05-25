"use client"

import { useState, useEffect } from "react"
import { Clock, User, CalendarIcon } from "lucide-react"

interface Appointment {
  id: string
  title: string
  time: string
  icon: string
  color: string
  doctor: string
  duration: string
}

interface ScheduleDay {
  day: string
  date: string
  appointments: Appointment[]
}

export default function UpcomingSchedule() {
  const [scheduleData, setScheduleData] = useState<ScheduleDay[]>([])

  useEffect(() => {
    import("../data/mockData.json").then((data) => {
      setScheduleData(data.upcomingSchedule)
    })
  }, [])

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center space-x-1.5 sm:space-x-2 mb-3 sm:mb-4 lg:mb-6">
        <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        <h2 className="text-responsive-lg sm:text-responsive-xl lg:text-responsive-2xl font-semibold text-gray-900">
          The Upcoming Schedule
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {scheduleData.map((daySchedule, dayIndex) => (
          <div
            key={daySchedule.day}
            className="transition-all duration-300"
            style={{ animationDelay: `${dayIndex * 200}ms` }}
          >
            <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1.5 sm:mb-2 lg:mb-3">
              <h3 className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base font-medium text-gray-500">
                On {daySchedule.day}
              </h3>
              <span className="text-responsive-xs sm:text-responsive-sm text-gray-400">({daySchedule.date})</span>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {daySchedule.appointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="p-2.5 sm:p-3 lg:p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
                  style={{
                    backgroundColor: appointment.color,
                    animationDelay: `${dayIndex * 200 + index * 100}ms`,
                  }}
                >
                  <div className="flex items-start space-x-1.5 sm:space-x-2 lg:space-x-3">
                    <span
                      className="text-sm sm:text-base lg:text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ animationDelay: `${dayIndex * 200 + index * 150}ms` }}
                    >
                      {appointment.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-gray-900 mb-0.5 sm:mb-1 text-responsive-sm sm:text-responsive-base lg:text-responsive-lg leading-tight group-hover:text-gray-700 transition-colors duration-200 truncate">
                        {appointment.title}
                      </h4>
                      <div className="flex items-center space-x-1 mb-0.5 sm:mb-1">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500 flex-shrink-0" />
                        <p className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base text-gray-600 truncate">
                          {appointment.time}
                        </p>
                        <span className="text-responsive-xs sm:text-responsive-sm text-gray-500">
                          ({appointment.duration})
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500 flex-shrink-0" />
                        <p className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base text-gray-600 truncate">
                          {appointment.doctor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-responsive-sm sm:text-responsive-base">
          <span className="text-gray-500">Total upcoming</span>
          <span className="font-semibold text-gray-900">
            {scheduleData.reduce((total, day) => total + day.appointments.length, 0)} appointments
          </span>
        </div>
      </div>
    </div>
  )
}
