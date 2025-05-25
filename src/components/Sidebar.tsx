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
import { navigationItems } from "../data/mockData"

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
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto
      `}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between lg:justify-start mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">General</h3>
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="space-y-1 sm:space-y-2">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap]
              return (
                <a
                  key={item.id}
                  href="#"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
