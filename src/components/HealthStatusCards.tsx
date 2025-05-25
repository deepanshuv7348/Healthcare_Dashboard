import { healthStatusCards } from "../data/mockData"

export default function HealthStatusCards() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {healthStatusCards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="text-xl sm:text-2xl flex-shrink-0">{card.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{card.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Date: {card.date}</p>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${card.progress}%`,
                    backgroundColor: card.color,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{card.progress}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
