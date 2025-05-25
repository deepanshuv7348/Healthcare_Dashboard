"use client"

import { Search, Bell, Plus, Menu } from "lucide-react"

interface HeaderProps {
  onMenuToggle?: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4 sm:space-x-8">
        {onMenuToggle && (
          <button onClick={onMenuToggle} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="text-xl sm:text-2xl font-bold">
          <span className="text-cyan-400">Health</span>
          <span className="text-gray-800">care.</span>
        </div>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-60 lg:w-80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="sm:hidden p-2 text-gray-600 hover:text-gray-800">
          <Search className="w-5 h-5" />
        </button>

        <button className="relative p-2 text-gray-600 hover:text-gray-800">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User Avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-400"
          />
        </div>

        <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  )
}
