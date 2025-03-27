import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Define a global type for insurance details
declare global {
  interface Window {
    insuranceDetails?: {
      provider: string
      policyNumber: string
      patientName: string
      dateOfBirth: string
      relationship: string
      groupNumber: string
      effectiveDate: string
      hasSecondaryInsurance: boolean
      secondaryProvider?: string
      secondaryPolicyNumber?: string
      contactPhone: string
      contactEmail: string
    }
  }
}

interface InsuranceDetailsProps {
  amount: number
  onPaymentComplete: () => void
}

const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ amount, onPaymentComplete }) => {
  const [provider, setProvider] = useState<string>("")
  const [policyNumber, setPolicyNumber] = useState<string>("")
  const [patientName, setPatientName] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined)
  const [relationship, setRelationship] = useState<string>("self")
  const [groupNumber, setGroupNumber] = useState<string>("")
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(undefined)
  const [hasSecondaryInsurance, setHasSecondaryInsurance] = useState<boolean>(false)
  const [secondaryProvider, setSecondaryProvider] = useState<string>("")
  const [secondaryPolicyNumber, setSecondaryPolicyNumber] = useState<string>("")
  const [contactPhone, setContactPhone] = useState<string>("")
  const [contactEmail, setContactEmail] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<{
    provider?: string
    policyNumber?: string
    patientName?: string
    dateOfBirth?: string
    groupNumber?: string
    effectiveDate?: string
    secondaryProvider?: string
    secondaryPolicyNumber?: string
    contactPhone?: string
    contactEmail?: string
  }>({})

  const insuranceProviders = [
    "Social Health Insurance Fund (SHIF - SHA)",
    "AAR Insurance",
    "Jubilee Health Insurance",
    "Britam Health Insurance",
    "CIC Insurance",
    "Resolution Insurance",
    "Madison Insurance",
    "GA Insurance",
    "APA Insurance",
    "Heritage Insurance",
  ]

  const relationshipOptions = [
    { value: "self", label: "Self" },
    { value: "spouse", label: "Spouse" },
    { value: "child", label: "Child" },
    { value: "other", label: "Other Dependent" },
  ]

  const isSHIF = provider === "Social Health Insurance Fund (SHIF - SHA)"

  const validateForm = () => {
    const newErrors: {
      provider?: string
      policyNumber?: string
      patientName?: string
      dateOfBirth?: string
      groupNumber?: string
      effectiveDate?: string
      secondaryProvider?: string
      secondaryPolicyNumber?: string
      contactPhone?: string
      contactEmail?: string
    } = {}

    if (!provider) {
      newErrors.provider = "Insurance provider is required"
    }

    if (!policyNumber) {
      newErrors.policyNumber = isSHIF ? "National ID is required" : "Policy/Member ID is required"
    } else if (isSHIF) {
      // Validate National ID format for SHIF (assuming Kenyan ID format)
      if (!/^\d{8,10}$/.test(policyNumber.replace(/\D/g, ""))) {
        newErrors.policyNumber = "Please enter a valid National ID (8-10 digits)"
      }
    } else if (policyNumber.length < 5) {
      newErrors.policyNumber = "Policy/Member ID must be at least 5 characters"
    }

    if (!patientName) {
      newErrors.patientName = "Patient name is required"
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }

    if (!effectiveDate) {
      newErrors.effectiveDate = "Effective date is required"
    }

    if (hasSecondaryInsurance) {
      if (!secondaryProvider) {
        newErrors.secondaryProvider = "Secondary insurance provider is required"
      }
      if (!secondaryPolicyNumber) {
        newErrors.secondaryPolicyNumber = "Secondary policy number is required"
      }
    }

    if (!contactPhone) {
      newErrors.contactPhone = "Contact phone is required"
    } else if (!/^\d{10}$/.test(contactPhone.replace(/\D/g, ""))) {
      newErrors.contactPhone = "Please enter a valid 10-digit phone number"
    }

    if (!contactEmail) {
      newErrors.contactEmail = "Contact email is required"
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Store insurance details in window object for access in receipt
    window.insuranceDetails = {
      provider,
      policyNumber,
      patientName,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : "",
      relationship,
      groupNumber,
      effectiveDate: effectiveDate ? format(effectiveDate, "yyyy-MM-dd") : "",
      hasSecondaryInsurance,
      ...(hasSecondaryInsurance && {
        secondaryProvider,
        secondaryPolicyNumber,
      }),
      contactPhone,
      contactEmail,
    }

    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false)
      onPaymentComplete()
    }, 1500)
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-md text-gray-900">Insurance Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Invoiced Amount :</span>
                <span className="font-bold text-hospital-700">KES {formatAmount(amount)}</span>
              </div>
            </div>

            <Tabs defaultValue="primary" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="primary">Primary Insurance</TabsTrigger>
                <TabsTrigger value="patient">Patient Details</TabsTrigger>
              </TabsList>

              <TabsContent value="primary" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insurance-provider">Insurance Provider*</Label>
                    <Select value={provider} onValueChange={setProvider}>
                      <SelectTrigger id="insurance-provider">
                        <SelectValue placeholder="Select insurance provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {insuranceProviders.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.provider && <p className="text-red-500 text-sm">{errors.provider}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policy-number">
                      {isSHIF ? "National ID No*" : "Policy No | Member ID*"}
                    </Label>
                    <Input
                      id="policy-number"
                      placeholder={isSHIF ? "Enter your National ID" : "Enter your policy number or member ID"}
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                    />
                    {errors.policyNumber && <p className="text-red-500 text-sm">{errors.policyNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-number">PolicyHolder Name*</Label>
                    <Input
                      id="group-number"
                      placeholder="Enter PolicyHolder Name"
                      value={groupNumber}
                      onChange={(e) => setGroupNumber(e.target.value)}
                    />
                    {errors.groupNumber && <p className="text-red-500 text-sm">{errors.groupNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="effective-date">Effective Date*</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !effectiveDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {effectiveDate ? format(effectiveDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={effectiveDate} onSelect={setEffectiveDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                    {errors.effectiveDate && <p className="text-red-500 text-sm">{errors.effectiveDate}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="secondary-insurance"
                      checked={hasSecondaryInsurance}
                      onCheckedChange={(checked) => setHasSecondaryInsurance(checked === true)}
                    />
                    <Label htmlFor="secondary-insurance">I have secondary insurance</Label>
                  </div>
                </div>

                {hasSecondaryInsurance && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="secondary-provider">Secondary Insurance Provider*</Label>
                      <Select value={secondaryProvider} onValueChange={setSecondaryProvider}>
                        <SelectTrigger id="secondary-provider">
                          <SelectValue placeholder="Select secondary provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {insuranceProviders.map((provider) => (
                            <SelectItem key={provider} value={provider}>
                              {provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.secondaryProvider && <p className="text-red-500 text-sm">{errors.secondaryProvider}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-policy-number">Secondary Policy Number*</Label>
                      <Input
                        id="secondary-policy-number"
                        placeholder="Enter secondary policy number"
                        value={secondaryPolicyNumber}
                        onChange={(e) => setSecondaryPolicyNumber(e.target.value)}
                      />
                      {errors.secondaryPolicyNumber && (
                        <p className="text-red-500 text-sm">{errors.secondaryPolicyNumber}</p>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="patient" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Patient Full Name*</Label>
                    <Input
                      id="patient-name"
                      placeholder="Enter patient's full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                    {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-of-birth">Date of Birth*</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateOfBirth && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1920}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship to Policyholder</Label>
                    <Select value={relationship} onValueChange={setRelationship}>
                      <SelectTrigger id="relationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationshipOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone*</Label>
                    <Input
                      id="contact-phone"
                      placeholder="Enter contact phone number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                    {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email*</Label>
                    <Input
                      id="contact-email"
                      placeholder="Enter contact email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
              <p className="font-medium">Please note:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Verify your insurance details are correct before submitting</li>
                <li>You may need to present your insurance card at the appointment</li>
                <li>Some services may require pre-authorization</li>
                <li>Fields marked with * are required</li>
                <li>Insurance verification may take 24-48 hours for new patients</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full bg-hospital-600 hover:bg-hospital-700" disabled={isSubmitting}>
        {isSubmitting ? "Verifying Insurance..." : "Verify & Complete"}
      </Button>
    </form>
  )
}

export default InsuranceDetails