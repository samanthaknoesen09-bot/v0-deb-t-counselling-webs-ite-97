"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Phone, Video, MapPin } from "lucide-react"

interface BookingCalendarProps {
  defaultService?: string
}

export function BookingCalendar({ defaultService = "" }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    message: "",
  })

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()

      // For online appointments: Monday to Friday (1-5)
      // For in-person appointments: Monday to Thursday (1-4)
      if (appointmentType === "in-person") {
        // Monday to Thursday only
        if (dayOfWeek >= 1 && dayOfWeek <= 4) {
          dates.push({
            value: date.toISOString().split("T")[0],
            label: date.toLocaleDateString("en-ZA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })
        }
      } else if (appointmentType === "whatsapp" || appointmentType === "telephone") {
        // Monday to Friday
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          dates.push({
            value: date.toISOString().split("T")[0],
            label: date.toLocaleDateString("en-ZA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })
        }
      }
    }
    return dates
  }

  const getAvailableTimes = () => {
    if (appointmentType === "in-person") {
      // In-person: Monday to Thursday, 10am-2pm only (1-hour slots)
      return ["10:00", "11:00", "12:00", "13:00"]
    } else if (appointmentType === "whatsapp" || appointmentType === "telephone") {
      // Online: Monday to Friday, 9am-5pm (1-hour slots)
      return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
    }
    return []
  }

  const handleAppointmentTypeChange = (value: string) => {
    setAppointmentType(value)
    setSelectedDate("")
    setSelectedTime("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          appointmentType, // Added appointment type to submission
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setBookingSuccess(true)

        // Open Google Calendar link in new window to add to calendar
        if (data.calendarLink) {
          window.open(data.calendarLink, "_blank")
        }

        // Reset form after 5 seconds
        setTimeout(() => {
          setSelectedDate("")
          setSelectedTime("")
          setAppointmentType("")
          setFormData({
            name: "",
            phone: "",
            email: "",
            service: "",
            message: "",
          })
          setBookingSuccess(false)
        }, 5000)
      } else {
        alert("Failed to book appointment. Please try again or contact us directly.")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("Failed to book appointment. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (bookingSuccess) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Calendar className="h-5 w-5" />
                  Appointment Confirmed!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  Your consultation has been booked for{" "}
                  <strong>
                    {new Date(selectedDate).toLocaleDateString("en-ZA", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>{" "}
                  at <strong>{selectedTime}</strong>.
                </p>
                <p className="text-muted-foreground">
                  A calendar invitation and confirmation email has been sent to you and our office at info@dcsam.co.za.
                </p>
                <p className="text-muted-foreground">
                  You will receive a confirmation email shortly with all the details.
                </p>
                <p className="text-sm text-muted-foreground">
                  A Google Calendar window has opened to add this appointment to your calendar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Book Your Free Consultation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a confidential consultation with our certified debt counsellors. Take the first step towards
            financial freedom today.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule Your Appointment
              </CardTitle>
              <CardDescription>
                Choose a convenient time for your free debt counselling consultation (1 hour)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <Select value={appointmentType} onValueChange={handleAppointmentTypeChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Online via WhatsApp</div>
                            <div className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="telephone">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Online via Telephone</div>
                            <div className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="in-person">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <div>
                            <div className="font-medium">In-Person (Onsite)</div>
                            <div className="text-xs text-muted-foreground">Mon-Thu, 10am-2pm</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {appointmentType && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Select Date</Label>
                      <Select value={selectedDate} onValueChange={setSelectedDate} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a date" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableDates().map((date) => (
                            <SelectItem key={date.value} value={date.value}>
                              {date.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Select Time (1 hour slot)</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableTimes().map((time) => (
                            <SelectItem key={time} value={time}>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {time} - {(Number.parseInt(time) + 1).toString().padStart(2, "0")}:00
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the service you need" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debt-review">Debt Review & Financial Counselling</SelectItem>
                      <SelectItem value="budget-planning">Budget Planning & Savings Coaching</SelectItem>
                      <SelectItem value="credit-repair">Credit Repair</SelectItem>
                      <SelectItem value="general-consultation">General Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your financial situation or any specific concerns..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!selectedDate || !selectedTime || !appointmentType || isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Free Consultation"}
                </Button>

                <div className="text-center text-sm text-muted-foreground space-y-1">
                  <p>Your appointment will be confirmed via email to info@dcsam.co.za</p>
                  <p className="font-medium">Availability:</p>
                  <p>Online (WhatsApp/Telephone): Monday-Friday, 9am-5pm</p>
                  <p>In-Person: Monday-Thursday, 10am-2pm</p>
                  <p className="mt-2">All consultations are completely confidential.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
