"use client"

import { FormDescription } from "@/components/ui/form"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  Receipt,
  Building,
  Users,
  Star,
  Briefcase,
  UserPlus,
} from "lucide-react"
import { format } from "date-fns"

// Import your components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PaymentMethodSelector, { type PaymentMethod } from "@/components/PaymentMethodSelector"
import MpesaPayment from "@/components/MpesaPayment"
import CardPayment from "@/components/CardPayment"
import BankTransferPayment from "@/components/BankTransferPayment"
import PrintReceiptButton from "@/components/PrintReceiptButton"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import InsuranceDetails from "@/components/InsuranceDetails"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  department: z.enum(
    ["cardiology", "neurology", "orthopedics", "pediatrics", "dermatology", "ophthalmology", "dentistry", "psychiatry"],
    {
      required_error: "Please select a department.",
    },
  ),
  doctor: z.string().min(1, { message: "Please select a doctor." }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  timePreference: z.string({
    required_error: "Please select a time slot.",
  }),
  reason: z.string().min(10, { message: "Please provide a brief description of your appointment reason." }),
  // Corporate fields
  isCompany: z.boolean().default(false),
  companyName: z.string().optional(),
  companyId: z.string().optional(),
  employeeId: z.string().optional(),
  priority: z.boolean().default(false),
  groupBooking: z.boolean().default(false),
  numberOfAttendees: z.number().min(1).max(20).optional(),
  billingType: z.enum(["individual", "company"]).default("individual"),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  referralCode: z.string().optional(),
})

// Corporate account schema
const corporateAccountSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person name must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Please enter a valid email address." }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "501+"]),
  industry: z.string().min(2, { message: "Industry must be at least 2 characters." }),
  billingAddress: z.string().min(5, { message: "Billing address must be at least 5 characters." }),
  taxId: z.string().optional(),
})

// Sample doctors by department
const doctorsByDepartment: Record<
  string,
  Array<{ id: string; name: string; title: string; availability?: string; priority?: boolean }>
> = {
  cardiology: [
    { id: "c1", name: "Dr. Michael Smith", title: "Cardiologist", availability: "High", priority: true },
    { id: "c2", name: "Dr. Emily Johnson", title: "Interventional Cardiologist", availability: "Medium" },
    { id: "c3", name: "Dr. David Wilson", title: "Heart Rhythm Specialist", availability: "Doctor on call" },
  ],
  neurology: [
    { id: "n1", name: "Dr. Sarah Thompson", title: "Neurologist", availability: "Medium", priority: true },
    { id: "n2", name: "Dr. Robert Lee", title: "Neurosurgeon", availability: "Doctor on call" },
    { id: "n3", name: "Dr. Jessica Brown", title: "Stroke Specialist", availability: "High" },
  ],
  orthopedics: [
    { id: "o1", name: "Dr. James Anderson", title: "Orthopedic Surgeon", availability: "High", priority: true },
    { id: "o2", name: "Dr. Patricia Martinez", title: "Sports Medicine Specialist", availability: "Medium" },
    { id: "o3", name: "Dr. Richard Taylor", title: "Joint Replacement Surgeon", availability: "Doctor on call" },
  ],
  pediatrics: [
    { id: "p1", name: "Dr. Jennifer White", title: "Pediatrician", availability: "High" },
    { id: "p2", name: "Dr. Thomas Garcia", title: "Pediatric Neurologist", availability: "Doctor on call", priority: true },
    { id: "p3", name: "Dr. Lisa Rodriguez", title: "Pediatric Endocrinologist", availability: "Medium" },
  ],
  dermatology: [
    { id: "d1", name: "Dr. Mark Davis", title: "Dermatologist", availability: "High", priority: true },
    { id: "d2", name: "Dr. Linda Wilson", title: "Cosmetic Dermatologist", availability: "Medium" },
    { id: "d3", name: "Dr. Daniel Harris", title: "Pediatric Dermatologist", availability: "Doctor on call" },
  ],
  ophthalmology: [
    { id: "op1", name: "Dr. Susan Martin", title: "Ophthalmologist", availability: "Medium" },
    { id: "op2", name: "Dr. John Clark", title: "Retina Specialist", availability: "Doctor on call", priority: true },
    { id: "op3", name: "Dr. Karen Wright", title: "Pediatric Ophthalmologist", availability: "High" },
  ],
  dentistry: [
    { id: "de1", name: "Dr. Charles Lewis", title: "Dentist", availability: "High" },
    { id: "de2", name: "Dr. Nancy Walker", title: "Orthodontist", availability: "Medium", priority: true },
    { id: "de3", name: "Dr. George Green", title: "Periodontist", availability: "Doctor on call" },
  ],
  psychiatry: [
    { id: "ps1", name: "Dr. Elizabeth Adams", title: "Psychiatrist", availability: "Doctor on call", priority: true },
    { id: "ps2", name: "Dr. William Hall", title: "Child Psychiatrist", availability: "Medium" },
    { id: "ps3", name: "Dr. Margaret Young", title: "Geriatric Psychiatrist", availability: "High" },
  ],
}

// Pricing based on department
const departmentPricing: Record<string, { standard: number; priority: number; corporate: number }> = {
  cardiology: { standard: 1500, priority: 2000, corporate: 1350 },
  neurology: { standard: 1800, priority: 2400, corporate: 1620 },
  orthopedics: { standard: 1400, priority: 1900, corporate: 1260 },
  pediatrics: { standard: 1000, priority: 1400, corporate: 900 },
  dermatology: { standard: 1200, priority: 1600, corporate: 1080 },
  ophthalmology: { standard: 1300, priority: 1700, corporate: 1170 },
  dentistry: { standard: 1100, priority: 1500, corporate: 990 },
  psychiatry: { standard: 1600, priority: 2100, corporate: 1440 },
}

// Insurance providers
const insuranceProviders = [
  { id: "National Health Insurance", name: "National Health Insurance" },
  { id: "MediCare Plus", name: "MediCare Plus" },
  { id: "Corporate Health Shield", name: "Corporate Health Shield" },
  { id: "Global Health Partners", name: "Global Health Partners" },
  { id: "Premier Health Insurance", name: "Premier Health Insurance" },
  { id: "Allianz Insurance Kenya", name: "Allianz Insurance Kenya" },
  { id: "Britam Insurance", name: "Britam Insurance" },
  { id: "CIC Insurance Group", name: "CIC Insurance Group" },
  { id: "Jubilee Insurance", name: "Jubilee Insurance" },
  { id: "Madison Insurance", name: "Madison Insurance" },
  { id: "Old Mutual Kenya", name: "Old Mutual Kenya" },
  { id: "Kenindia Assurance", name: "Kenindia Assurance" },
  { id: "GA Insurance Kenya", name: "GA Insurance Kenya" },
  { id: "First Assurance", name: "First Assurance" },
  { id: "Liberty Life Kenya", name: "Liberty Life Kenya" },
]

// Corporate partners

// Steps in the appointment booking process
type BookingStep = "form" | "payment" | "confirmation"
type BookingType = "individual" | "corporate" | "group"

const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@")
  const maskedLocalPart = localPart.length > 2 ? localPart[0] + "*".repeat(localPart.length - 2) + localPart.slice(-1) : localPart
  return `${maskedLocalPart}@${domain}`
}

const maskPhone = (phone: string): string => {
  return phone.replace(/\d(?=\d{4})/g, "*")
}

const Appointments = () => {
  const [step, setStep] = useState<BookingStep>("form")
  const [bookingType, setBookingType] = useState<BookingType>("individual")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [appointmentDetails, setAppointmentDetails] = useState<z.infer<typeof formSchema> | null>(null)
  const [availableDoctors, setAvailableDoctors] = useState<
    Array<{ id: string; name: string; title: string; availability?: string; priority?: boolean }>
  >([])
  const [transactionId, setTransactionId] = useState<string>("")
  const [paymentDate, setPaymentDate] = useState<string>("")
  const [showCorporateDialog, setShowCorporateDialog] = useState(false)
  const [corporateAccount, setCorporateAccount] = useState<z.infer<typeof corporateAccountSchema> | null>(null)

  // Initialize corporate account form
  const corporateAccountForm = useForm<z.infer<typeof corporateAccountSchema>>({
    resolver: zodResolver(corporateAccountSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      companySize: undefined,
      industry: "",
      billingAddress: "",
      taxId: "",
    },
  })

  // Initialize the appointment form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: undefined,
      doctor: "",
      reason: "",
      isCompany: false,
      companyName: "",
      companyId: "",
      employeeId: "",
      priority: false,
      groupBooking: false,
      numberOfAttendees: 1,
      billingType: "individual",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      referralCode: "",
    },
  })

  // Watch for department changes and other fields
  const selectedDepartment = form.watch("department")
  const isCompany = form.watch("isCompany")
  const priority = form.watch("priority")

  // Update available doctors when department changes
  useEffect(() => {
    if (selectedDepartment) {
      setAvailableDoctors(doctorsByDepartment[selectedDepartment] || [])
      // Reset doctor selection when department changes
      form.setValue("doctor", "")
    }
  }, [selectedDepartment, form])

  // Handle corporate account registration
  const handleCorporateAccountSubmit = (data: z.infer<typeof corporateAccountSchema>) => {
    setCorporateAccount(data)
    setShowCorporateDialog(false)
    form.setValue("companyName", data.companyName)
    form.setValue("isCompany", true)
    toast.success("Corporate account registered successfully!")
  }

  /**
   * Gets available time slots for the selected date
   * @param date The selected appointment date
   * @returns Array of available time slots with more specific times
   */
  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return []

    const now = new Date()
    const selectedDate = new Date(date)
    selectedDate.setHours(0, 0, 0, 0)

    // Allow appointments from Monday to Sunday
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      return []
    }

    const isToday = selectedDate.getTime() === today.getTime()
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()

    // Define all possible time slots
    const morningSlots = [
      {
        value: "morning-9",
        label: "9:00 AM",
        group: "morning",
        disabled: isToday && (currentHour > 9 || (currentHour === 9 && currentMinute > 0)),
      },
      {
        value: "morning-10",
        label: "10:00 AM",
        group: "morning",
        disabled: isToday && (currentHour > 10 || (currentHour === 10 && currentMinute > 0)),
      },
      {
        value: "morning-11",
        label: "11:00 AM",
        group: "morning",
        disabled: isToday && (currentHour > 11 || (currentHour === 11 && currentMinute > 0)),
      },
    ]

    const afternoonSlots = [
      {
        value: "afternoon-13",
        label: "1:00 PM",
        group: "afternoon",
        disabled: isToday && (currentHour > 13 || (currentHour === 13 && currentMinute > 0)),
      },
      {
        value: "afternoon-14",
        label: "2:00 PM",
        group: "afternoon",
        disabled: isToday && (currentHour > 14 || (currentHour === 14 && currentMinute > 0)),
      },
      {
        value: "afternoon-15",
        label: "3:00 PM",
        group: "afternoon",
        disabled: isToday && (currentHour > 15 || (currentHour === 15 && currentMinute > 0)),
      },
    ]

    const eveningSlots = [
      {
        value: "evening-17",
        label: "5:00 PM",
        group: "evening",
        disabled: isToday && (currentHour > 17 || (currentHour === 17 && currentMinute > 0)),
      },
      {
        value: "evening-18",
        label: "6:00 PM",
        group: "evening",
        disabled: isToday && (currentHour > 18 || (currentHour === 18 && currentMinute > 0)),
      },
    ]

    // Add priority slots for corporate clients
    if (isCompany || priority) {
      morningSlots.unshift({
        value: "morning-8",
        label: "8:00 AM (Priority)",
        group: "morning",
        disabled: isToday && (currentHour > 8 || (currentHour === 8 && currentMinute > 0)),
      })
      afternoonSlots.push({
        value: "afternoon-16",
        label: "4:00 PM (Priority)",
        group: "afternoon",
        disabled: isToday && (currentHour > 16 || (currentHour === 16 && currentMinute > 0)),
      })
      eveningSlots.push({
        value: "evening-19",
        label: "7:00 PM (Priority)",
        group: "evening",
        disabled: isToday && (currentHour > 19 || (currentHour === 19 && currentMinute > 0)),
      })
    }

    return [...morningSlots, ...afternoonSlots, ...eveningSlots]
  }

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setAppointmentDetails(values)
    setStep("payment")
  }

  // Handle payment completion
  function handlePaymentComplete() {
    setStep("confirmation")
    // Generate a random transaction ID
    const generatedTransactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    setTransactionId(generatedTransactionId)
    // Set payment date to current date
    setPaymentDate(new Date().toISOString())
    toast.success("Your appointment and payment have been confirmed!")
  }

  // Calculate appointment cost based on selected department and options
  const calculateAppointmentCost = (): number => {
    if (!appointmentDetails) return 0

    let baseCost = 0

    if (appointmentDetails.isCompany) {
      baseCost = departmentPricing[appointmentDetails.department]?.corporate || 0
    } else if (appointmentDetails.priority) {
      baseCost = departmentPricing[appointmentDetails.department]?.priority || 0
    } else {
      baseCost = departmentPricing[appointmentDetails.department]?.standard || 0
    }

    // Apply group booking multiplier if applicable
    if (appointmentDetails.groupBooking && appointmentDetails.numberOfAttendees) {
      return baseCost * appointmentDetails.numberOfAttendees
    }

    return baseCost
  }

  // Handle going back to previous step
  function handleBack() {
    if (step === "payment") {
      setStep("form")
    }
  }

  // Get payment component based on selected method
  function getPaymentComponent() {
    const amount = calculateAppointmentCost()

    switch (paymentMethod) {
      case "mobile_money":
        return <MpesaPayment amount={amount} onPaymentComplete={handlePaymentComplete} />
      case "card":
        return <CardPayment amount={amount} onPaymentComplete={handlePaymentComplete} />
      case "bank_transfer":
        return <BankTransferPayment amount={amount} onPaymentComplete={handlePaymentComplete} />
      case "insurance":
        return <InsuranceDetails amount={amount} onPaymentComplete={handlePaymentComplete} />
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Amount:</span>
                <span className="font-bold text-hospital-700">${amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-warm-50 p-4 rounded-lg border border-warm-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-warm-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-warm-600" />
                </div>
                <div>
                  <h3 className="font-medium text-warm-800">Pay at Hospital</h3>
                  <p className="text-warm-700">
                    You will be asked to pay the consultation fee at our reception before your appointment.
                  </p>
                </div>
              </div>

              <Button onClick={handlePaymentComplete} className="w-full bg-hospital-600 hover:bg-hospital-700">
                Confirm Pay at Hospital
              </Button>
            </div>
          </div>
        )
    }
  }

  // Reset the form after booking confirmation
  function handleNewAppointment() {
    form.reset()
    setAppointmentDetails(null)
    setStep("form")
    setBookingType("individual")
  }

  /**
   * Gets a formatted display string for the time preference
   * @param timePreference The time preference value
   * @returns Formatted time display string
   */
  const getTimeDisplay = (timePreference: string): string => {
    if (timePreference.startsWith("morning-")) {
      const hour = timePreference.split("-")[1]
      return `${hour}:00 AM`
    } else if (timePreference.startsWith("afternoon-")) {
      const hour = Number.parseInt(timePreference.split("-")[1]) - 12
      return `${hour}:00 PM`
    } else if (timePreference.startsWith("evening-")) {
      const hour = Number.parseInt(timePreference.split("-")[1]) - 12
      return `${hour}:00 PM`
    } else if (timePreference === "morning") {
      return "Morning (9:00 AM - 12:00 PM)"
    } else if (timePreference === "afternoon") {
      return "Afternoon (1:00 PM - 4:00 PM)"
    } else {
      return "Evening (5:00 PM - 7:00 PM)"
    }
  }

  // Get payment receipt data
  const getPaymentReceiptData = () => {
    if (!appointmentDetails) return {}

    const amount = calculateAppointmentCost()
    const doctorInfo = doctorsByDepartment[appointmentDetails.department]?.find(
      (d) => d.id === appointmentDetails.doctor,
    )

    return {
      patientName: appointmentDetails.name,
      email: maskEmail(appointmentDetails.email),
      phone: maskPhone(appointmentDetails.phone),
      serviceType: `${appointmentDetails.department.charAt(0).toUpperCase() + appointmentDetails.department.slice(1)} Consultation`,
      amount: amount,
      paymentMethod:
        paymentMethod === "mobile_money"
          ? "Mobile Money"
          : paymentMethod === "card"
            ? "Credit/Debit Card"
            : paymentMethod === "bank_transfer"
              ? "Bank Transfer"
              : paymentMethod === "insurance"
                ? "Insurance"
                : "Cash at Hospital",
      paymentDate: paymentDate,
      transactionId: transactionId,
      doctorName: doctorInfo?.name || "To be assigned",
      appointmentDate: appointmentDetails.date ? format(appointmentDetails.date, "MMMM d, yyyy") : "",
      appointmentTime: getTimeDisplay(appointmentDetails.timePreference),
      companyName: appointmentDetails.companyName || "",
      employeeId: appointmentDetails.employeeId || "",
      groupBooking: appointmentDetails.groupBooking,
      numberOfAttendees: appointmentDetails.numberOfAttendees || 1,
      billingType: appointmentDetails.billingType,
      insuranceProvider: appointmentDetails.insuranceProvider || "",
      insurancePolicyNumber: appointmentDetails.insurancePolicyNumber || "",
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-24 flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-hospital-800 mb-4">
                Book an Appointment
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Schedule your visit with our medical specialists. Please fill out the form beDoctor on call, and our team will
                contact you to confirm your appointment.
              </p>
            </div>

            {/* Booking Type Selector */}
            {step === "form" && (
              <div className="max-w-4xl mx-auto mb-8">
                <Tabs
                  defaultValue="individual"
                  value={bookingType}
                  onValueChange={(value) => setBookingType(value as BookingType)}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="individual"
                      onClick={() => {
                        form.setValue("isCompany", false)
                        form.setValue("groupBooking", false)
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Individual
                    </TabsTrigger>
                    <TabsTrigger
                      value="corporate"
                      onClick={() => {
                        form.setValue("isCompany", true)
                        form.setValue("groupBooking", false)
                      }}
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Corporate
                    </TabsTrigger>
                    <TabsTrigger
                      value="group"
                      onClick={() => {
                        form.setValue("groupBooking", true)
                      }}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Group Booking
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex justify-between">
                <div className="flex-1 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative mx-auto ${step === "form" ? "bg-hospital-600 text-white" : "bg-hospital-200 text-hospital-700"}`}
                  >
                    1
                  </div>
                  <div className="text-center mt-2 text-sm font-medium text-gray-700">Personal Details</div>
                </div>

                <div className="flex-1 relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
                    <div
                      className={`h-full bg-hospital-500 transition-all ${step === "form" ? "w-0" : "w-full"}`}
                    ></div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative mx-auto ${step === "payment" ? "bg-hospital-600 text-white" : step === "confirmation" ? "bg-hospital-200 text-hospital-700" : "bg-gray-200 text-gray-500"}`}
                  >
                    2
                  </div>
                  <div className="text-center mt-2 text-sm font-medium text-gray-700">Payment</div>
                </div>

                <div className="flex-1 relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
                    <div
                      className={`h-full bg-hospital-500 transition-all ${step === "confirmation" ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative mx-auto ${step === "confirmation" ? "bg-hospital-600 text-white" : "bg-gray-200 text-gray-500"}`}
                  >
                    3
                  </div>
                  <div className="text-center mt-2 text-sm font-medium text-gray-700">Confirmation</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  {step === "form" && (
                    <>
                      <h2 className="text-2xl font-display font-bold text-hospital-700 mb-6">
                        {bookingType === "individual"
                          ? "Individual Appointment Request"
                          : bookingType === "corporate"
                            ? "Corporate Appointment Request"
                            : "Group Appointment Request"}
                      </h2>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {/* Corporate Account Section */}
                          {bookingType === "corporate" && (
                            <Card className="mb-6 border-hospital-100 bg-hospital-50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                  <Building className="mr-2 h-5 w-5 text-hospital-600" />
                                  Corporate Account
                                </CardTitle>
                                <CardDescription>
                                  Enter your corporate details for special rates and priority scheduling
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Company Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="employeeId"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Employee ID</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Employee ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="mt-4">
                                  <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                          <FormLabel>Priority Scheduling</FormLabel>
                                          <FormDescription>
                                            Get access to priority time slots and expedited service
                                          </FormDescription>
                                        </div>
                                        <FormControl>
                                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="mt-4">
                                  <FormField
                                    control={form.control}
                                    name="billingType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Billing Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select billing type" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="individual">Individual Payment</SelectItem>
                                            <SelectItem value="company">Company Invoice</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <div className="mt-4">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full border-hospital-200 text-hospital-700"
                                    onClick={() => setShowCorporateDialog(true)}
                                  >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Register New Corporate Account
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {/* Group Booking Section */}
                          {bookingType === "group" && (
                            <Card className="mb-6 border-hospital-100 bg-hospital-50">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                  <Users className="mr-2 h-5 w-5 text-hospital-600" />
                                  Group Booking
                                </CardTitle>
                                <CardDescription>Book appointments for multiple people at once</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="numberOfAttendees"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Number of Attendees</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            min={1}
                                            max={20}
                                            placeholder="Number of people"
                                            {...field}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                          />
                                        </FormControl>
                                        <FormDescription>Maximum 20 people per group booking</FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="isCompany"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel>This is a corporate group booking</FormLabel>
                                          <FormDescription>Apply corporate rates and benefits</FormDescription>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Full Names" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="active-email@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254 700 520 0008" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                  >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="cardiology" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Cardiology</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="neurology" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Neurology</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="orthopedics" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Orthopedics</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="pediatrics" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Pediatrics</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="dermatology" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Dermatology</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="ophthalmology" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Ophthalmology</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="dentistry" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Dentistry</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="psychiatry" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">Psychiatry</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Doctor Selection Field - Only shown when department is selected */}
                          {selectedDepartment && (
                            <FormField
                              control={form.control}
                              name="doctor"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Doctor</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a specialist" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {availableDoctors.map((doctor) => (
                                        <SelectItem key={doctor.id} value={doctor.id}>
                                          <div className="flex flex-col">
                                            <div className="flex items-center">
                                              <span>{doctor.name}</span>
                                              {doctor.priority && (
                                                <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                                                  <Star className="h-3 w-3 mr-1" /> Priority
                                                </Badge>
                                              )}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                              <span>{doctor.title}</span>
                                              {doctor.availability && (
                                                <Badge
                                                  className={`ml-2 ${
                                                    doctor.availability === "High"
                                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                      : doctor.availability === "Medium"
                                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                                  }`}
                                                >
                                                  {doctor.availability} Availability
                                                </Badge>
                                              )}
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Preferred Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={`w-full justify-start text-left font-normal ${
                                            !field.value && "text-muted-foreground"
                                          }`}
                                        >
                                          <Calendar className="mr-2 h-4 w-4" />
                                          {field.value ? format(field.value, "PPP") : <span>Select a date</span>}
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <CalendarComponent
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => {
                                          // Disable dates in the past
                                          const today = new Date()
                                          today.setHours(0, 0, 0, 0)
                                          return date < today
                                        }}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="timePreference"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Time</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a time slot" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem
                                        value="morning"
                                        className="font-semibold text-hospital-700 bg-hospital-50 py-2"
                                      >
                                        Morning
                                      </SelectItem>
                                      {getAvailableTimeSlots(form.watch("date"))
                                        .filter((slot) => slot.group === "morning")
                                        .map((slot) => (
                                          <SelectItem
                                            key={slot.value}
                                            value={slot.value}
                                            disabled={slot.disabled}
                                            className="pl-6"
                                          >
                                            <div className="flex items-center gap-2">
                                              <Clock className="h-3.5 w-3.5 text-hospital-500" />
                                              <span>{slot.label}</span>
                                              {slot.disabled && (
                                                <span className="text-xs text-red-500 ml-1">(Time Slot Closed)</span>
                                              )}
                                            </div>
                                          </SelectItem>
                                        ))}

                                      <SelectItem
                                        value="afternoon"
                                        className="font-semibold text-hospital-700 bg-hospital-50 py-2 mt-1"
                                      >
                                        Afternoon
                                      </SelectItem>
                                      {getAvailableTimeSlots(form.watch("date"))
                                        .filter((slot) => slot.group === "afternoon")
                                        .map((slot) => (
                                          <SelectItem
                                            key={slot.value}
                                            value={slot.value}
                                            disabled={slot.disabled}
                                            className="pl-6"
                                          >
                                            <div className="flex items-center gap-2">
                                              <Clock className="h-3.5 w-3.5 text-hospital-500" />
                                              <span>{slot.label}</span>
                                              {slot.disabled && (
                                                <span className="text-xs text-red-500 ml-1">(Time Slot Closed)</span>
                                              )}
                                            </div>
                                          </SelectItem>
                                        ))}

                                      <SelectItem
                                        value="evening"
                                        className="font-semibold text-hospital-700 bg-hospital-50 py-2 mt-1"
                                      >
                                        Evening
                                      </SelectItem>
                                      {getAvailableTimeSlots(form.watch("date"))
                                        .filter((slot) => slot.group === "evening")
                                        .map((slot) => (
                                          <SelectItem
                                            key={slot.value}
                                            value={slot.value}
                                            disabled={slot.disabled}
                                            className="pl-6"
                                          >
                                            <div className="flex items-center gap-2">
                                              <Clock className="h-3.5 w-3.5 text-hospital-500" />
                                              <span>{slot.label}</span>
                                              {slot.disabled && (
                                                <span className="text-xs text-red-500 ml-1">(Time Slot Closed)</span>
                                              )}
                                            </div>
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Insurance Information */}
                          <FormField
                            control={form.control}
                            name="insuranceProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Insurance Provider (Only if you are using Insurance for Payment)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select insurance provider (if applicable)" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {insuranceProviders.map((provider) => (
                                      <SelectItem key={provider.id} value={provider.id}>
                                        {provider.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {form.watch("insuranceProvider") && (
                            <FormField
                              control={form.control}
                              name="insurancePolicyNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance Policy Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Policy Number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reason for Appointment</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Please briefly describe your symptoms or reason for visit..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                         
                          <Button type="submit" className="w-full bg-hospital-600 hover:bg-hospital-700">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Continue to Payment
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}

                  {step === "payment" && appointmentDetails && (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <button
                          onClick={handleBack}
                          className="text-gray-600 hover:text-hospital-600 flex items-center text-sm"
                        >
                          <ArrowLeft className="mr-1 h-4 w-4" /> Back
                        </button>
                        <h2 className="text-2xl font-display font-bold text-hospital-700">Payment</h2>
                      </div>

                      {/* Appointment Summary */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-900 mb-3">Appointment Summary</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Patient Name :</p>
                              <p className="font-medium">{appointmentDetails.name}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Appointment Date :</p>
                              <p className="font-medium">{format(appointmentDetails.date, "MMMM d, yyyy")}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Appointment Time :</p>
                              <p className="font-medium">{getTimeDisplay(appointmentDetails.timePreference)}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Department :</p>
                              <p className="font-medium capitalize">{appointmentDetails.department}</p>
                            </div>
                          </div>

                          {/* Display selected doctor */}
                          {appointmentDetails.doctor && (
                            <div className="flex items-start gap-2 col-span-2">
                              <User className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-gray-500">Specialist Doctor :</p>
                                <p className="font-medium">
                                  {doctorsByDepartment[appointmentDetails.department]?.find(
                                    (d) => d.id === appointmentDetails.doctor,
                                  )?.name || appointmentDetails.doctor}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Corporate details if applicable */}
                          {appointmentDetails.isCompany && appointmentDetails.companyName && (
                            <div className="flex items-start gap-2 col-span-2">
                              <Building className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-gray-500">Company :</p>
                                <p className="font-medium">{appointmentDetails.companyName}</p>
                              </div>
                            </div>
                          )}

                          {/* Group booking details if applicable */}
                          {appointmentDetails.groupBooking && appointmentDetails.numberOfAttendees && (
                            <div className="flex items-start gap-2 col-span-2">
                              <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-gray-500">Group Size :</p>
                                <p className="font-medium">{appointmentDetails.numberOfAttendees} people</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Payment Method Selector */}
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-900 mb-3">Select Payment Method</h3>
                        <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
                      </div>

                      {/* Payment Form */}
                      <div className="mt-8 pt-6 border-t border-gray-100">{getPaymentComponent()}</div>
                    </>
                  )}

                  {step === "confirmation" && appointmentDetails && (
                    <div className="text-center py-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>

                      <h2 className="text-2xl font-display font-bold text-green-600 mb-3">Appointment Confirmed!</h2>

                      <p className="text-gray-600 mb-8">
                        Thank you for booking an appointment with us. We've sent a confirmation to your email.
                      </p>

                      <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-xl border border-gray-200 text-left mb-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-gray-900">Appointment Details</h3>
                          <PrintReceiptButton paymentData={getPaymentReceiptData()} />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reference :</span>
                            <span className="font-medium">APT-{Math.floor(100000 + Math.random() * 900000)}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Patient :</span>
                            <span className="font-medium">{appointmentDetails.name}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Email :</span>
                            <span className="font-medium">{maskEmail(appointmentDetails.email)}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone :</span>
                            <span className="font-medium">{maskPhone(appointmentDetails.phone)}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Department :</span>
                            <span className="font-medium capitalize">{appointmentDetails.department}</span>
                          </div>

                          {/* Display selected doctor in confirmation */}
                          {appointmentDetails.doctor && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Specialist Doctor :</span>
                              <span className="font-medium">
                                {doctorsByDepartment[appointmentDetails.department]?.find(
                                  (d) => d.id === appointmentDetails.doctor,
                                )?.name || appointmentDetails.doctor}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-gray-600">Appointment Date :</span>
                            <span className="font-medium">{format(appointmentDetails.date, "MMMM d, yyyy")}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Appointment Time :</span>
                            <span className="font-medium">{getTimeDisplay(appointmentDetails.timePreference)}</span>
                          </div>

                          {/* Corporate details if applicable */}
                          {appointmentDetails.isCompany && appointmentDetails.companyName && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Company:</span>
                              <span className="font-medium">{appointmentDetails.companyName}</span>
                            </div>
                          )}

                          {/* Group booking details if applicable */}
                          {appointmentDetails.groupBooking && appointmentDetails.numberOfAttendees && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Group Size:</span>
                              <span className="font-medium">{appointmentDetails.numberOfAttendees} people</span>
                            </div>
                          )}

                          <div className="pt-3 mt-3 border-t border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-2">Payment Information</h4>

                            <div className="flex justify-between">
                              <span className="text-gray-600">Invoiced Amount :</span>
                              <span className="font-medium text-hospital-700">
                                KES {calculateAppointmentCost().toFixed(2)}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment Method :</span>
                              <span className="font-medium">
                                {paymentMethod === "mobile_money"
                                  ? "Mobile Money"
                                  : paymentMethod === "card"
                                    ? "Credit/Debit Card"
                                    : paymentMethod === "bank_transfer"
                                      ? "Bank Transfer"
                                      : paymentMethod === "insurance"
                                        ? "Insurance"
                                        : "Pay via Insurance"}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-600">Transaction ID :</span>
                              <span className="font-medium font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                {transactionId}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment Date :</span>
                              <span className="font-medium">{format(new Date(paymentDate), "MMMM d, yyyy")}</span>
                            </div>

                            <div className="flex justify-between mt-2">
                              <span className="text-gray-600">Invoice  Status :</span>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Paid</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex justify-between gap-4">
                            <Button
                              onClick={handleNewAppointment}
                              variant="outline"
                              className="flex-1 border-hospital-200 text-hospital-700 hover:bg-orange-500"
                            >
                              Book Another Appointment
                            </Button>
                            <PrintReceiptButton paymentData={getPaymentReceiptData()} />
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-gray-600 mb-4">
                        <p>Please arrive 15 minutes before your scheduled appointment time.</p>
                        <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right sidebar - Only show on larger screens */}
              <div className="hidden lg:block">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="text-xl font-display font-bold text-hospital-700 mb-4">Appointment Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-hospital-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-hospital-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Flexible Scheduling</h4>
                        <p className="text-gray-600 text-sm">
                          Choose from morning, afternoon, or evening appointments based on your availability.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-hospital-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-hospital-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Expert Specialists</h4>
                        <p className="text-gray-600 text-sm">
                          Our team of board-certified specialists provides comprehensive care across all medical fields.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-hospital-100 p-2 rounded-full">
                        <Receipt className="h-5 w-5 text-hospital-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Convenient Payment</h4>
                        <p className="text-gray-600 text-sm">
                          Multiple payment options available, including Mobile Payment | Credit/Debit Cards & Insurance
                          Covers.
                        </p>
                      </div>
                    </div>

                    {/* Corporate Benefits */}
                    <div className="flex items-start gap-3">
                      <div className="bg-hospital-100 p-2 rounded-full">
                        <Building className="h-5 w-5 text-hospital-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Corporate Benefits</h4>
                        <p className="text-gray-600 text-sm">
                          Special rates, priority scheduling, and dedicated account management for corporate clients.
                        </p>
                      </div>
                    </div>

                    {/* Group Booking */}
                    <div className="flex items-start gap-3">
                      <div className="bg-hospital-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-hospital-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Group Appointments</h4>
                        <p className="text-gray-600 text-sm">
                          Book appointments for multiple people at once with our streamlined group booking process.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Need Assistance?</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Our front office are here to help you schedule your visit.
                    </p>

                    <div className="flex items-center gap-2 text-hospital-700">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">+254 700 520 0008</span>
                    </div>
                  </div>

                  {/* Corporate Account Management */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Corporate Account Management</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      For corporate inquiries and dedicated account setup, please contact our corporate relations team.
                    </p>

                    <div className="flex items-center gap-2 text-hospital-700">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">appointments@medicareplus.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Corporate Account Registration Dialog */}
      <Dialog open={showCorporateDialog} onOpenChange={setShowCorporateDialog}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Register Corporate Account</DialogTitle>
            <DialogDescription>
              Complete the form beDoctor on call to register your company for corporate benefits.
            </DialogDescription>
          </DialogHeader>
          <Form {...corporateAccountForm}>
            <form onSubmit={corporateAccountForm.handleSubmit(handleCorporateAccountSubmit)} className="space-y-4">
              <FormField
                control={corporateAccountForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={corporateAccountForm.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={corporateAccountForm.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={corporateAccountForm.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={corporateAccountForm.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={corporateAccountForm.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="Industry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={corporateAccountForm.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Full billing address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={corporateAccountForm.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Tax ID / VAT Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-hospital-600 hover:bg-hospital-700">
                  Register Account
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Appointments

