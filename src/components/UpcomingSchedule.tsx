import { upcomingSchedule } from "../data/mockData"

export default function UpcomingSchedule() {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">The Upcoming Schedule</h2>

      <div className="space-y-4 sm:space-y-6">
        {upcomingSchedule.map((daySchedule) => (
          <div key={daySchedule.day}>
            <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">On {daySchedule.day}</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
              {daySchedule.appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-3 sm:p-4 rounded-lg border border-gray-200"
                  style={{ backgroundColor: appointment.color }}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-base sm:text-lg flex-shrink-0">{appointment.icon}</span>
                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base leading-tight">
                        {appointment.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
