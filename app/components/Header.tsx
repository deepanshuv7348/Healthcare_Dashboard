"use client"

import { Search, Bell, Plus, Menu, ChevronDown, User, Settings, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

interface HeaderProps {
  onMenuToggle: () => void
}

interface UserData {
  name: string
  avatar: string
  role: string
  notifications: number
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Load user data
    import("../data/mockData.json").then((data) => {
      setUserData(data.user)
    })
  }, [])

  const profileMenuItems = [
    { icon: User, label: "Profile", action: () => console.log("Profile") },
    { icon: Settings, label: "Settings", action: () => console.log("Settings") },
    { icon: LogOut, label: "Logout", action: () => console.log("Logout") },
  ]

  return (
    <header className="bg-white border-b border-gray-200 px-2 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between z-50 sticky top-0 backdrop-blur-sm bg-white/95">
      <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        <div className="text-responsive-2xl sm:text-responsive-3xl lg:text-responsive-4xl font-bold">
          <span className="text-cyan-400">Health</span>
          <span className="text-gray-800">care.</span>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg w-60 sm:w-80 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-responsive-sm sm:text-responsive-base"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="md:hidden p-1 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button className="relative p-1 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          {userData?.notifications && (
            <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-responsive-xs sm:text-responsive-sm rounded-full flex items-center justify-center animate-pulse">
              {userData.notifications}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <img
              src={userData?.avatar || "/placeholder.svg?height=40&width=40"}
              alt="User Avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-cyan-400"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyMkQzRUUiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K"
              }}
            />
            <div className="hidden sm:block text-left">
              <div className="text-responsive-sm sm:text-responsive-base font-medium text-gray-900 truncate max-w-24 sm:max-w-32">
                {userData?.name || "Loading..."}
              </div>
              <div className="text-responsive-xs sm:text-responsive-sm text-gray-500 truncate max-w-24 sm:max-w-32">
                {userData?.role || ""}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              {profileMenuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action()
                    setShowProfileMenu(false)
                  }}
                  className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-responsive-sm sm:text-responsive-base text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <item.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {showProfileMenu && <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />}
    </header>
  )
}
