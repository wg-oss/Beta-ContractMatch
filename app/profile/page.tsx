"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera, Star, MapPin, Calendar, Settings, Edit, Plus, X } from "lucide-react"
import Link from "next/link"

const userProfile = {
  name: "Alex Thompson",
  role: "realtor", // or 'contractor'
  company: "Thompson Real Estate",
  email: "alex@thompsonrealty.com",
  phone: "(555) 987-6543",
  location: "Downtown, Seattle",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Experienced realtor specializing in residential properties in the Seattle area. Passionate about helping clients find their dream homes.",
  specialties: ["Residential Sales", "First-Time Buyers", "Investment Properties"],
  experience: 8,
  rating: 4.7,
  reviews: 89,
  connections: 156,
  projects: 23,
}

const contractorProfile = {
  name: "Mike Johnson",
  role: "contractor",
  company: "Johnson Construction",
  email: "mike@johnsonconstruction.com",
  phone: "(555) 123-4567",
  location: "Downtown, Seattle",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Licensed general contractor with 12 years of experience in residential renovations and new construction.",
  specialties: ["General Contracting", "Kitchen Remodeling", "Bathroom Renovation"],
  experience: 12,
  rating: 4.8,
  reviews: 156,
  connections: 89,
  projects: 67,
  certifications: ["Licensed General Contractor", "Insured", "BBB A+"],
  availability: "Available this week",
  portfolio: [
    { id: 1, image: "/placeholder.svg?height=200&width=300", title: "Modern Kitchen Renovation" },
    { id: 2, image: "/placeholder.svg?height=200&width=300", title: "Luxury Bathroom Remodel" },
    { id: 3, image: "/placeholder.svg?height=200&width=300", title: "Home Addition Project" },
  ],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState(userProfile) // Switch to contractorProfile for contractor view

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Profile</h1>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xl">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                        <p className="text-lg text-gray-600">{profile.company}</p>

                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-medium">{profile.rating}</span>
                            <span className="text-gray-500">({profile.reviews} reviews)</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-600">{profile.experience} years experience</span>
                        </div>

                        <div className="flex items-center space-x-1 mt-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "default" : "outline"}
                        className="mt-4 md:mt-0"
                      >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                        <Edit className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {isEditing ? (
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.bio}</p>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                        {isEditing && (
                          <button className="ml-1 hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button size="sm" variant="outline" className="h-6">
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{profile.connections}</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{profile.projects}</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{profile.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{profile.reviews}</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-700 mt-1">{profile.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1">{profile.location}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Portfolio</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {profile.role === "contractor" && contractorProfile.portfolio ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contractorProfile.portfolio.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <div className="flex justify-between items-center">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items yet</h3>
                  <p className="text-gray-600 mb-4">
                    {profile.role === "realtor"
                      ? "Add your successful property sales and client testimonials"
                      : "Showcase your completed projects and work samples"}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All notifications</SelectItem>
                      <SelectItem value="important">Important only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="privacy">Profile Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="connections">Connections only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="availability">Availability Status</Label>
                  <Select defaultValue="available">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="distance">Search Radius</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 miles</SelectItem>
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
