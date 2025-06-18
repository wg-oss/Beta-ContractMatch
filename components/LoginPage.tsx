"use client"

import type React from "react"
import { Building2, Hammer } from "lucide-react"

interface User {
  username: string
  email: string
  password: string
  role: "realtor" | "contractor"
  id: string
}

interface LoginPageProps {
  onLogin: (user: {
    id: string
    role: "realtor" | "contractor"
    username?: string
    email?: string
    password?: string
  }) => void
  tempUsers: User[]
  setTempUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const credentials = {
    realtor: { username: "emma", password: "realtor123", id: "r1" },
    contractor: { username: "john", password: "contractor123", id: "c1" },
  }

  const handleRealtorLogin = () => {
    const sessionData = {
      id: credentials.realtor.id,
      role: "realtor" as const,
      username: credentials.realtor.username,
    }
    localStorage.setItem("currentSession", JSON.stringify(sessionData))
    onLogin(sessionData)
  }

  const handleContractorLogin = () => {
    const sessionData = {
      id: credentials.contractor.id,
      role: "contractor" as const,
      username: credentials.contractor.username,
    }
    localStorage.setItem("currentSession", JSON.stringify(sessionData))
    onLogin(sessionData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ContractMatch</h1>
          <p className="text-lg text-gray-600 mb-2">Connect with trusted professionals</p>
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Beta Preview
          </div>
        </div>

        {/* Login Options */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Try the Platform</h2>
            <p className="text-gray-600">Choose your role to explore the features</p>
          </div>

          <div className="space-y-4">
            {/* Realtor Button */}
            <button
              onClick={handleRealtorLogin}
              className="w-full p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Building2 size={32} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900">I'm a Realtor</h3>
                  <p className="text-gray-600">Find contractors for your clients</p>
                </div>
              </div>
            </button>

            {/* Contractor Button */}
            <button
              onClick={handleContractorLogin}
              className="w-full p-6 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <Hammer size={32} className="text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900">I'm a Contractor</h3>
                  <p className="text-gray-600">Connect with realtors and grow your business</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">What you can explore:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Professional Feed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Swipe Discovery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Messaging</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Portfolio Showcase</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Meeting Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Professional Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>This is a demo version. No real accounts are created.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
