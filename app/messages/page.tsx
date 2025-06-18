"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Paperclip, Calendar, Phone, Video, MoreVertical } from "lucide-react"
import Link from "next/link"

const conversations = [
  {
    id: 1,
    name: "Mike Johnson",
    role: "General Contractor",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I can start the kitchen renovation next Monday. Would that work for you?",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Martinez",
    role: "Plumber",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The quote for the bathroom plumbing is ready. I'll send it over shortly.",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Electrician",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for choosing our services! Looking forward to working with you.",
    timestamp: "3 hours ago",
    unread: 1,
    online: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "Mike Johnson",
    content: "Hi! I saw your request for a kitchen renovation. I'd love to discuss the project with you.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Great! I'm looking to renovate a 12x10 kitchen. When would be a good time to discuss the details?",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Mike Johnson",
    content:
      "I have availability this week. Would Thursday afternoon work for you? I can come by to take measurements and provide a detailed quote.",
    timestamp: "10:40 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    content: "Thursday afternoon sounds perfect! What time works best for you?",
    timestamp: "10:42 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Mike Johnson",
    content: "How about 2:00 PM? I can start the kitchen renovation next Monday. Would that work for you?",
    timestamp: "10:45 AM",
    isOwn: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [showConversationList, setShowConversationList] = useState(true)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleConversationSelect = (conversation: (typeof conversations)[0]) => {
    setSelectedConversation(conversation)
    setShowConversationList(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {!showConversationList ? (
                <Button variant="ghost" size="sm" onClick={() => setShowConversationList(true)} className="md:hidden">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <h1 className="text-lg font-semibold">{showConversationList ? "Messages" : selectedConversation.name}</h1>
              {!showConversationList && (
                <Badge variant="secondary" className="text-xs">
                  {selectedConversation.role}
                </Badge>
              )}
            </div>
            {!showConversationList && (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto flex h-[calc(100vh-80px)]">
        {/* Conversations List */}
        <div
          className={`${showConversationList ? "block" : "hidden"} md:block w-full md:w-1/3 bg-white border-r border-gray-200`}
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Conversations</h2>
          </div>

          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation.id === conversation.id ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => handleConversationSelect(conversation)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{conversation.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="text-xs px-2 py-1 min-w-[20px] h-5">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{conversation.role}</p>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${showConversationList ? "hidden" : "block"} md:block flex-1 flex flex-col bg-white`}>
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{selectedConversation.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.online ? "Online now" : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
