import { ChevronLeft, ChevronRight } from "lucide-react"
import { calendarData, appointmentCards } from "../data/mockData"

export default function CalendarView() {
  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-xs sm:text-sm text-gray-500">This Week</span>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {calendarData.month} {calendarData.year}
          </h2>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 mb-4 sm:mb-6">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 pb-2">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 3)}</span>
          </div>
        ))}

        {calendarData.days.map((day) => (
          <div key={day.date} className="text-center">
            <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{day.date}</div>
            <div className="space-y-1">
              {day.appointments.slice(0, 3).map((time, index) => (
                <div
                  key={index}
                  className={`text-xs px-1 sm:px-2 py-1 rounded text-white ${
                    index % 2 === 0 ? "bg-blue-600" : "bg-purple-500"
                  }`}
                >
                  <span className="hidden sm:inline">{time}</span>
                  <span className="sm:hidden">{time.split(":")[0]}</span>
                </div>
              ))}
              {day.appointments.length > 3 && (
                <div className="text-xs text-gray-500">+{day.appointments.length - 3}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {appointmentCards.map((appointment) => (
          <div
            key={appointment.id}
            className="p-3 sm:p-4 rounded-lg text-white"
            style={{ backgroundColor: appointment.color }}
          >
            <h3 className="font-semibold mb-1 text-sm sm:text-base">{appointment.title}</h3>
            <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">{appointment.time}</p>
            <p className="text-xs sm:text-sm opacity-80">{appointment.doctor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
