"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface HealthCard {
  id: string
  title: string
  date: string
  progress: number
  status: string
  icon: string
  color: string
  trend: string
  lastCheckup: string
}

export default function HealthStatusCards() {
  const [healthCards, setHealthCards] = useState<HealthCard[]>([])

  useEffect(() => {
    import("../data/mockData.json").then((data) => {
      setHealthCards(data.healthStatusCards)
    })
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
      default:
        return <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-2 sm:space-y-3 lg:space-y-4 h-full">
      {healthCards.map((card, index) => (
        <div
          key={card.id}
          className="bg-white rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex items-start space-x-2 sm:space-x-3">
            <div
              className="text-lg sm:text-xl lg:text-2xl flex-shrink-0 animate-bounce"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {card.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-responsive-sm sm:text-responsive-base lg:text-responsive-lg truncate">
                  {card.title}
                </h3>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(card.trend)}
                  <span
                    className={`text-responsive-xs sm:text-responsive-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getStatusColor(card.status)}`}
                  >
                    {card.status}
                  </span>
                </div>
              </div>
              <p className="text-responsive-xs sm:text-responsive-sm lg:text-responsive-base text-gray-500 mb-1.5 sm:mb-2 lg:mb-3">
                Date: {card.date}
              </p>

              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1.5 sm:mb-2 overflow-hidden">
                <div
                  className="h-1.5 sm:h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${card.progress}%`,
                    backgroundColor: card.color,
                    animation: `progressFill 1s ease-out ${index * 200}ms both`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-500">{card.progress}%</div>
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-400">{card.lastCheckup}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: ${healthCards.map((card) => card.progress)}%;
          }
        }
      `}</style>
    </div>
  )
}
