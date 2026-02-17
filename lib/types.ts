export type APIResponse<T = unknown> =
  | { success: true; data?: T }
  | { success: false; error: { message: string; code: string } }

export type BookAppointmentData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  serviceType?: string
}

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export type CallbackRequestData = {
  name: string
  phone: string
  email?: string
  preferredTime?: string
  reason?: string
}
