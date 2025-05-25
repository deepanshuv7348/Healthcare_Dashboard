"use client"

import {
  LayoutDashboard,
  History,
  Calendar,
  Clock,
  BarChart3,
  FileText,
  MessageCircle,
  HelpCircle,
  Settings,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"

const iconMap = {
  LayoutDashboard,
  History,
  Calendar,
  Clock,
  BarChart3,
  FileText,
  MessageCircle,
  HelpCircle,
  Settings,
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavigationItem {
  id: string
  label: string
  icon: string
  active?: boolean
  count?: number | null
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])

  useEffect(() => {
    import("../data/mockData.json").then((data) => {
      setNavigationItems(data.navigationItems)
    })
  }, [])

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-56 sm:w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto flex-shrink-0
      `}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between lg:justify-start mb-4 sm:mb-6">
            <h3 className="text-responsive-xs sm:text-responsive-sm font-medium text-gray-500 uppercase tracking-wider">
              General
            </h3>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </button>
          </div>

          <nav className="space-y-1 sm:space-y-2">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              return (
                <a
                  key={item.id}
                  href="#"
                  className={`flex items-center justify-between px-2 sm:px-3 py-2 rounded-lg text-responsive-sm sm:text-responsive-base font-medium transition-all duration-200 group ${
                    item.active
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count && (
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-responsive-xs sm:text-responsive-sm rounded-full ${
                        item.active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </a>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
