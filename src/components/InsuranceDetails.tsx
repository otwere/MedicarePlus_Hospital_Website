"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Import the toast functionality at the top of the file
import { useToast } from "@/hooks/use-toast"

// Define a global type for insurance details
declare global {
  interface Window {
    insuranceDetails?: {
      provider: string
      policyNumber: string
      patientName: string
      medicalRecordNumber: string
      relationship: string
      groupNumber: string
      coveragePeriod: string
      effectiveDate: string
      hasSecondaryInsurance: boolean
      secondaryProvider?: string
      secondaryPolicyNumber?: string
      contactPhone: string
      contactEmail: string
      employeeId?: string
      corporateAccount?: string
      coveragePercentage?: number
      patientResponsibility?: number
      insuranceCoverage?: number
      preAuthCode?: string
      dependents?: Array<{
        name: string
        relationship: string
        gender: string
        medicalRecordNumber?: string
        dateOfBirth?: string
      }>
    }
  }
}

// Add this interface for dependents after the Window interface
interface Dependent {
  id: string
  name: string
  relationship: string
  dateOfBirth?: Date
  gender: string
  medicalRecordNumber?: string
  verified: boolean
}

interface InsuranceDetailsProps {
  amount: number
  onPaymentComplete: () => void
}

const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ amount, onPaymentComplete }) => {
  const [medicalRecordNumber, setMedicalRecordNumber] = useState<string>("")
  const [coveragePeriod, setCoveragePeriod] = useState<string>("")
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
    medicalRecordNumber?: string
    groupNumber?: string
    coveragePeriod?: string
    secondaryProvider?: string
    secondaryPolicyNumber?: string
    contactPhone?: string
    contactEmail?: string
    otp?: string
    preAuthCode?: string
    dependentOtp?: string
  }>({})

  const [isPolicyVerified, setIsPolicyVerified] = useState<boolean>(false)
  const [policyDetails, setPolicyDetails] = useState<{
    policyHolderName: string
    policyHolderPhone: string
    policyHolderEmail: string
    coverageType: string
    coverageLimit: string
    expiryDate: string
    policyStatus: string
    corporateAccount: string
    employeeId?: string
    dependents?: number
    coveragePercentage: number
    deductible: string
    networkType: string
    approvalRequired: boolean
    approvalCategories?: string[]
  } | null>(null)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>("")
  const [otpVerified, setOtpVerified] = useState<boolean>(false)
  const [maskedPhone, setMaskedPhone] = useState<string>("")

  const [corporateVerified, setCorporateVerified] = useState<boolean>(false)
  const [employeeId, setEmployeeId] = useState<string>("")
  const [corporateDiscount, setCorporateDiscount] = useState<number>(0)
  const [preAuthRequired, setPreAuthRequired] = useState<boolean>(false)
  const [preAuthCode, setPreAuthCode] = useState<string>("")
  const [preAuthVerified, setPreAuthVerified] = useState<boolean>(false)
  const [coverageCalculated, setCoverageCalculated] = useState<boolean>(false)
  const [patientResponsibility, setPatientResponsibility] = useState<number>(0)
  const [insuranceCoverage, setInsuranceCoverage] = useState<number>(0)
  const [verificationStep, setVerificationStep] = useState<
    "policy" | "ownership" | "corporate" | "preauth" | "complete"
  >("policy")

  // Add these state variables in the component after the existing state declarations
  const [dependents, setDependents] = useState<Dependent[]>([])
  const [showAddDependent, setShowAddDependent] = useState<boolean>(false)
  const [newDependent, setNewDependent] = useState<Dependent>({
    id: "",
    name: "",
    relationship: "child",
    gender: "male",
    medicalRecordNumber: "",
    verified: false,
  })
  const [dependentErrors, setDependentErrors] = useState<{
    name?: string
    relationship?: string
    gender?: string
  }>({})

  // Add these state variables for dependent verification
  const [dependentOtpSent, setDependentOtpSent] = useState<boolean>(false)
  const [dependentOtp, setDependentOtp] = useState<string>("")
  const [isVerifyingDependent, setIsVerifyingDependent] = useState<boolean>(false)
  const [pendingDependent, setPendingDependent] = useState<Dependent | null>(null)
  const [showDependentOtpForm, setShowDependentOtpForm] = useState<boolean>(false)

  // Add a new state variable for the selected patient after the other state declarations
  const [selectedPatient, setSelectedPatient] = useState<string>("self")

  // Add the useToast hook in the component
  const { toast } = useToast()

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

  // Add these functions before the validateForm function
  const addDependent = () => {
    // Validate dependent fields
    const errors: { name?: string; relationship?: string; gender?: string } = {}

    if (!newDependent.name) {
      errors.name = "Dependent name is required"
    }

    if (!newDependent.relationship) {
      errors.relationship = "Relationship is required"
    }

    if (Object.keys(errors).length > 0) {
      setDependentErrors(errors)
      return
    }

    // Create a pending dependent with a unique ID
    const dependent = {
      ...newDependent,
      id: Date.now().toString(),
    }

    // Set the pending dependent and show OTP verification form
    setPendingDependent(dependent)
    setDependentErrors({})

    // Only proceed with OTP verification if policy is verified
    if (isPolicyVerified && policyDetails) {
      sendDependentOTP()
    } else {
      // If policy not verified, just add the dependent without verification
      setDependents([...dependents, dependent])
      setNewDependent({
        id: "",
        name: "",
        relationship: "child",
        gender: "male",
        medicalRecordNumber: "",
        verified: false,
      })
      setShowAddDependent(false)
    }
  }

  const sendDependentOTP = () => {
    setIsVerifyingDependent(true)

    // Simulate sending OTP to the policyholder's phone
    setTimeout(() => {
      setDependentOtpSent(true)
      setShowDependentOtpForm(true)
      setIsVerifyingDependent(false)
      // In a real app, this would trigger an API call to send an OTP
    }, 1000)
  }

  const verifyDependentOTP = () => {
    // Simulate OTP verification
    if (dependentOtp.length === 6 && pendingDependent) {
      // Mark the dependent as verified and add to the list
      const verifiedDependent = {
        ...pendingDependent,
        verified: true,
      }

      setDependents([...dependents, verifiedDependent])

      // Show success toast notification
      toast({
        title: "Dependent Added Successfully",
        description: `${verifiedDependent.name} has been added as a dependent to your policy.`,
        variant: "success",
      })

      // Reset the form
      setPendingDependent(null)
      setDependentOtp("")
      setDependentOtpSent(false)
      setShowDependentOtpForm(false)
      setNewDependent({
        id: "",
        name: "",
        relationship: "child",
        gender: "male",
        medicalRecordNumber: "",
        verified: false,
      })
      setShowAddDependent(false)
    } else {
      setErrors({
        ...errors,
        dependentOtp: "Invalid OTP. Please try again.",
      })
    }
  }

  const cancelDependentOTP = () => {
    setPendingDependent(null)
    setDependentOtp("")
    setDependentOtpSent(false)
    setShowDependentOtpForm(false)
    setErrors({
      ...errors,
      dependentOtp: undefined,
    })
  }

  const removeDependent = (id: string) => {
    setDependents(dependents.filter((dep) => dep.id !== id))
  }

  const validateForm = () => {
    const newErrors: {
      provider?: string
      policyNumber?: string
      patientName?: string
      medicalRecordNumber?: string
      groupNumber?: string
      coveragePeriod?: string
      secondaryProvider?: string
      secondaryPolicyNumber?: string
      contactPhone?: string
      contactEmail?: string
      otp?: string
      preAuthCode?: string
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

    if (!medicalRecordNumber && relationship === "self") {
      newErrors.medicalRecordNumber = "Medical record number is required for primary policyholder"
    }

    if (!coveragePeriod) {
      newErrors.coveragePeriod = "Coverage period is required"
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

  const verifyPolicyNumber = () => {
    if (!provider || !policyNumber) {
      setErrors({
        ...errors,
        provider: !provider ? "Insurance provider is required" : undefined,
        policyNumber: !policyNumber ? "Policy number is required" : undefined,
      })
      return
    }

    setIsVerifying(true)

    // Simulate API call to fetch policy details
    setTimeout(() => {
      // Mock policy details - in a real app, this would come from an API
      const mockPolicyDetails = {
        policyHolderName: "Otwere Evans",
        policyHolderPhone: "0733443224",
        policyHolderEmail: "john.doe@example.com",
        coverageType: "Corporate Health Plan",
        coverageLimit: "KES 2,500,000",
        expiryDate: "2025-12-31",
        policyStatus: "Active",
        corporateAccount: "Acme Corporation Ltd",
        employeeId: "EMP-2023-45678",
        dependents: 3,
        coveragePercentage: 80,
        deductible: "KES 5,000",
        networkType: "Preferred Provider Network",
        approvalRequired: true,
        approvalCategories: ["Specialist Consultations", "Diagnostic Tests", "Surgeries"],
      }

      setPolicyDetails(mockPolicyDetails)
      setPatientName(mockPolicyDetails.policyHolderName)
      setContactPhone(mockPolicyDetails.policyHolderPhone)
      setContactEmail(mockPolicyDetails.policyHolderEmail)
      setGroupNumber(mockPolicyDetails.policyHolderName)
      setEmployeeId(mockPolicyDetails.employeeId || "")

      // Create masked phone number (show only last 4 digits)
      const phone = mockPolicyDetails.policyHolderPhone
      const maskedNumber = phone.substring(0, phone.length - 4).replace(/\d/g, "*") + phone.substring(phone.length - 4)
      setMaskedPhone(maskedNumber)

      // Calculate coverage based on policy details
      const coverageAmount = (amount * mockPolicyDetails.coveragePercentage) / 100
      const patientAmount = amount - coverageAmount
      setInsuranceCoverage(coverageAmount)
      setPatientResponsibility(patientAmount)
      setCoverageCalculated(true)

      // Set pre-authorization requirement
      setPreAuthRequired(mockPolicyDetails.approvalRequired)

      // Set corporate discount if applicable
      if (mockPolicyDetails.corporateAccount) {
        setCorporateDiscount(10) // 10% corporate discount
        setCorporateVerified(true)
      }

      setIsPolicyVerified(true)
      setIsVerifying(false)
      setVerificationStep("ownership")

      // Set the patient as the policyholder by default
      setSelectedPatient("self")
      setPatientName(mockPolicyDetails.policyHolderName)
      setRelationship("self")
    }, 1500)
  }

  const verifyPreAuth = () => {
    if (!preAuthCode || preAuthCode.length < 6) {
      setErrors({
        ...errors,
        preAuthCode: "Please enter a valid pre-authorization code",
      })
      return
    }

    // Simulate pre-auth verification
    setTimeout(() => {
      setPreAuthVerified(true)
      setVerificationStep("complete")
    }, 1000)
  }

  const sendOTP = () => {
    // Simulate sending OTP to the policyholder's phone
    setTimeout(() => {
      setOtpSent(true)
      // In a real app, this would trigger an API call to send an OTP
    }, 1000)
  }

  const verifyOTP = () => {
    // Simulate OTP verification
    if (otp.length === 6) {
      setOtpVerified(true)
      setVerificationStep(preAuthRequired ? "preauth" : "complete")
    } else {
      setErrors({
        ...errors,
        otp: "Invalid OTP. Please try again.",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // If policy verification is required but not completed
    if (!isPolicyVerified || !policyDetails) {
      setErrors({
        ...errors,
        policyNumber: "Please verify your policy details first",
      })
      return
    }

    // If OTP verification is required but not completed
    if (isPolicyVerified && !otpVerified) {
      setErrors({
        ...errors,
        otp: "Please verify your ownership of the policy",
      })
      return
    }

    // If pre-authorization is required but not verified
    if (preAuthRequired && !preAuthVerified) {
      setErrors({
        ...errors,
        preAuthCode: "Pre-authorization verification is required",
      })
      return
    }

    setIsSubmitting(true)

    // Store insurance details in window object for access in receipt
    window.insuranceDetails = {
      provider,
      policyNumber,
      patientName,
      medicalRecordNumber,
      relationship,
      groupNumber,
      coveragePeriod,
      effectiveDate: effectiveDate ? format(effectiveDate, "yyyy-MM-dd") : "",
      hasSecondaryInsurance,
      ...(hasSecondaryInsurance && {
        secondaryProvider,
        secondaryPolicyNumber,
      }),
      contactPhone,
      contactEmail,
      employeeId,
      corporateAccount: policyDetails?.corporateAccount || "",
      coveragePercentage: policyDetails?.coveragePercentage || 0,
      patientResponsibility,
      insuranceCoverage,
      preAuthCode: preAuthVerified ? preAuthCode : "",
      selectedPatient,
      dependents: dependents.map((dep) => ({
        name: dep.name,
        relationship: dep.relationship,
        gender: dep.gender,
        medicalRecordNumber: dep.medicalRecordNumber || "",
        dateOfBirth: dep.dateOfBirth ? format(dep.dateOfBirth, "yyyy-MM-dd") : "",
        verified: dep.verified,
        isSelected: selectedPatient === dep.id,
      })),
    }

    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false)
      onPaymentComplete()
    }, 1500)
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="primary">Primary Insurance</TabsTrigger>
                <TabsTrigger value="patient">Patient Details</TabsTrigger>
                <TabsTrigger value="corporate">Corporate Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="primary" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insurance-provider-optional">Insurance Provider (Optional)</Label>
                    <Select
                      value={provider}
                      onValueChange={(value) => {
                        setProvider(value)
                        // Auto-populate the required field
                        if (value && !isPolicyVerified) {
                          // Additional logic could be added here if needed
                        }
                      }}
                      disabled={isPolicyVerified}
                    >
                      <SelectTrigger id="insurance-provider-optional">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="policy-number-optional">Insurance Policy Number</Label>
                    <Input
                      id="policy-number-optional"
                      placeholder="Enter your policy number or member ID"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                      disabled={isPolicyVerified}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurance-provider">Insurance Provider*</Label>
                      <Select value={provider} onValueChange={setProvider} disabled={isPolicyVerified}>
                        <SelectTrigger id="insurance-provider">
                          <SelectValue placeholder="Auto-populated from above" />
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
                      <Label htmlFor="policy-number">{isSHIF ? "National ID No*" : "Policy No | Member ID*"}</Label>
                      <div className="flex gap-2">
                        <Input
                          id="policy-number"
                          placeholder={isSHIF ? "Auto-populated National ID" : "Auto-populated policy number"}
                          value={policyNumber}
                          onChange={(e) => setPolicyNumber(e.target.value)}
                          disabled={isPolicyVerified}
                          className="flex-1"
                        />
                        {!isPolicyVerified ? (
                          <Button
                            type="button"
                            onClick={verifyPolicyNumber}
                            disabled={isVerifying || !policyNumber || !provider}
                            className="whitespace-nowrap"
                          >
                            {isVerifying ? "Verifying..." : "Verify"}
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsPolicyVerified(false)
                              setPolicyDetails(null)
                              setOtpSent(false)
                              setOtpVerified(false)
                            }}
                            className="whitespace-nowrap"
                          >
                            Change
                          </Button>
                        )}
                      </div>
                      {errors.policyNumber && <p className="text-red-500 text-sm">{errors.policyNumber}</p>}
                    </div>
                  </div>
                </div>

                {isPolicyVerified && policyDetails && (
                  <div className="border border-green-200 bg-green-50 rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-green-800">Policy Details Verified</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${policyDetails.policyStatus === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {policyDetails.policyStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">Policyholder :</span>{" "}
                        <span className="font-medium">{policyDetails.policyHolderName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Coverage Type :</span>{" "}
                        <span className="font-medium">{policyDetails.coverageType}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Coverage Limit :</span>{" "}
                        <span className="font-medium">{policyDetails.coverageLimit}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Expiry Date :</span>{" "}
                        <span className="font-medium">{policyDetails.expiryDate}</span>
                      </div>
                    </div>

                    {policyDetails.corporateAccount && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Corporate Account
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Company :</span>{" "}
                            <span className="font-medium">{policyDetails.corporateAccount}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Employee ID :</span>{" "}
                            <span className="font-medium">{policyDetails.employeeId}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Network Type :</span>{" "}
                            <span className="font-medium">{policyDetails.networkType}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Dependents :</span>{" "}
                            <span className="font-medium">{policyDetails.dependents}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {coverageCalculated && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-2">Coverage Calculation</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Amount :</span>
                            <span className="font-medium">KES {formatAmount(amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Coverage ({policyDetails.coveragePercentage}%) :</span>
                            <span className="font-medium text-green-700">KES {formatAmount(insuranceCoverage)}</span>
                          </div>
                          {corporateDiscount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Corporate Discount ({corporateDiscount}%) :</span>
                              <span className="font-medium text-green-700">
                                KES {formatAmount((patientResponsibility * corporateDiscount) / 100)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between pt-2 border-t border-amber-200">
                            <span className="text-gray-800 font-medium">Your Responsibility :</span>
                            <span className="font-bold">
                              KES{" "}
                              {formatAmount(
                                patientResponsibility -
                                  (corporateDiscount > 0 ? (patientResponsibility * corporateDiscount) / 100 : 0),
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {verificationStep === "ownership" && !otpVerified && (
                      <div className="mt-4 pt-3 border-t border-green-200">
                        <h4 className="font-medium text-green-800 mb-2">Verify Policy Ownership</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          To verify you're the policyholder, we'll send a verification code to {maskedPhone}
                        </p>

                        {!otpSent ? (
                          <Button type="button" onClick={sendOTP} className="w-full md:w-auto">
                            Send Verification Code
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600">Enter the 6-digit code sent to {maskedPhone}</p>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Enter 6-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                className="flex-1"
                              />
                              <Button type="button" onClick={verifyOTP}>
                                Verify
                              </Button>
                            </div>
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                            <Button type="button" variant="link" onClick={sendOTP} className="p-0 h-auto">
                              Resend Code
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {verificationStep === "preauth" && preAuthRequired && !preAuthVerified && (
                      <div className="mt-4 pt-3 border-t border-green-200">
                        <h4 className="font-medium text-amber-800 mb-2">Pre-Authorization Required</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          This service requires pre-authorization from your insurance provider.
                        </p>

                        <div className="mb-3 p-2 bg-white rounded border border-gray-200 text-xs">
                          <p className="font-medium mb-1">Pre-authorization required for:</p>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {policyDetails.approvalCategories?.map((category, index) => (
                              <li key={index}>{category}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="preauth-code">Pre-Authorization Code</Label>
                            <div className="flex gap-2">
                              <Input
                                id="preauth-code"
                                placeholder="Enter pre-authorization code"
                                value={preAuthCode}
                                onChange={(e) => setPreAuthCode(e.target.value)}
                                className="flex-1"
                              />
                              <Button type="button" onClick={verifyPreAuth}>
                                Verify
                              </Button>
                            </div>
                            {errors.preAuthCode && <p className="text-red-500 text-sm">{errors.preAuthCode}</p>}
                          </div>

                          <div className="text-sm text-gray-600">
                            <p>Don't have a pre-authorization code?</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>Contact your insurance provider at their helpline</li>
                              <li>Request pre-authorization for this service</li>
                              <li>Provide your policy number: {policyNumber}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {otpVerified && (
                      <div className="mt-4 pt-3 border-t border-green-200">
                        <div className="flex items-center text-green-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Policy ownership verified successfully</span>
                        </div>
                      </div>
                    )}

                    {preAuthVerified && (
                      <div className="mt-4 pt-3 border-t border-green-200">
                        <div className="flex items-center text-green-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Pre-authorization verified successfully</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-number">PolicyHolder Name*</Label>
                    <Input
                      id="group-number"
                      placeholder="Enter PolicyHolder Name"
                      value={groupNumber}
                      onChange={(e) => setGroupNumber(e.target.value)}
                      disabled={isPolicyVerified}
                    />
                    {errors.groupNumber && <p className="text-red-500 text-sm">{errors.groupNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverage-period">Coverage Period</Label>
                    <Select value={coveragePeriod} onValueChange={setCoveragePeriod} disabled={isPolicyVerified}>
                      <SelectTrigger id="coverage-period">
                        <SelectValue placeholder="Select coverage period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual (12 months)</SelectItem>
                        <SelectItem value="semi-annual">Semi-Annual (6 months)</SelectItem>
                        <SelectItem value="quarterly">Quarterly (3 months)</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="lifetime">Lifetime Coverage</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.coveragePeriod && <p className="text-red-500 text-sm">{errors.coveragePeriod}</p>}
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
                {isPolicyVerified && policyDetails ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="patient-selection">Select Patient</Label>
                      <Select
                        value={selectedPatient}
                        onValueChange={(value) => {
                          setSelectedPatient(value)

                          if (value === "self") {
                            // Set policyholder details
                            setPatientName(policyDetails.policyHolderName)
                            setRelationship("self")

                            // Show toast notification for policyholder selection
                            toast({
                              title: "Patient Selected",
                              description: `${policyDetails.policyHolderName} (Policyholder) has been selected as the patient.`,
                              variant: "default",
                              
                            })
                            // Other fields can be set as needed
                          } else {
                            // Find the selected dependent
                            const dependent = dependents.find((dep) => dep.id === value)
                            if (dependent) {
                              setPatientName(dependent.name)
                              setRelationship(dependent.relationship)
                              setMedicalRecordNumber(dependent.medicalRecordNumber || "")

                              // Show toast notification for dependent selection
                              toast({
                                title: "Patient Selected",
                                description: `${dependent.name} (${dependent.relationship}) has been selected as the patient.`,
                                variant: "default",
                                className: "bg-green-400 text-white",
                              })
                              // Other fields can be set as needed
                            }
                          }
                        }}
                      >
                        <SelectTrigger id="patient-selection">
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">{policyDetails.policyHolderName} (Policyholder)</SelectItem>
                          {dependents.map((dependent) => (
                            <SelectItem key={dependent.id} value={dependent.id}>
                              {dependent.name} ({dependent.relationship})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-name">Patient Full Name*</Label>
                        <Input
                          id="patient-name"
                          placeholder="Enter patient's full name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          disabled={true} // Disabled because it's pre-filled based on selection
                        />
                        {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medical-record">Medical Record Number</Label>
                        <Input
                          id="medical-record"
                          placeholder="Enter medical record number (if available)"
                          value={medicalRecordNumber}
                          onChange={(e) => setMedicalRecordNumber(e.target.value)}
                          disabled={selectedPatient !== "self"} // Only editable for policyholder
                        />
                        {errors.medicalRecordNumber && (
                          <p className="text-red-500 text-sm">{errors.medicalRecordNumber}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship to Policyholder</Label>
                        <Select value={relationship} onValueChange={setRelationship} disabled={true}>
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
                  </>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center text-amber-800 mb-2">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Policy Verification Required</span>
                    </div>
                    <p className="text-sm text-amber-700">
                      Please verify your insurance policy in the Primary Insurance tab before selecting a patient.
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900">Dependents</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddDependent(!showAddDependent)}
                      disabled={showDependentOtpForm || !isPolicyVerified}
                    >
                      {showAddDependent ? "Cancel" : "Add Dependent"}
                    </Button>
                  </div>

                  {/* OTP Verification for Adding Dependents */}
                  {showDependentOtpForm && pendingDependent && (
                    <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Verification Required</AlertTitle>
                      <AlertDescription>
                        <p className="mb-2">
                          To add {pendingDependent.name} as a dependent, we need to verify your identity.
                        </p>
                        <p className="text-sm mb-3">A verification code has been sent to {maskedPhone}</p>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter 6-digit code"
                              value={dependentOtp}
                              onChange={(e) => setDependentOtp(e.target.value)}
                              maxLength={6}
                              className="flex-1"
                            />
                            <Button type="button" onClick={verifyDependentOTP} variant="secondary">
                              Verify
                            </Button>
                          </div>
                          {errors.dependentOtp && <p className="text-red-500 text-sm">{errors.dependentOtp}</p>}
                          <div className="flex justify-between">
                            <Button type="button" variant="link" onClick={sendDependentOTP} className="p-0 h-auto">
                              Resend Code
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={cancelDependentOTP}
                              className="text-gray-600"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {dependents.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {dependents.map((dependent) => (
                        <div
                          key={dependent.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="font-medium">{dependent.name}</span>
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                                {dependent.relationship.charAt(0).toUpperCase() + dependent.relationship.slice(1)}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                {dependent.gender.charAt(0).toUpperCase() + dependent.gender.slice(1)}
                              </span>
                              {dependent.verified && (
                                <span className="ml-2 flex items-center text-xs text-green-600">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            {dependent.medicalRecordNumber && (
                              <div className="text-sm text-gray-500">MRN: {dependent.medicalRecordNumber}</div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPatient(dependent.id)
                                // Set patient details based on the dependent
                                setPatientName(dependent.name)
                                setRelationship(dependent.relationship)
                                setMedicalRecordNumber(dependent.medicalRecordNumber || "")

                                // Show toast notification
                                toast({
                                  title: "Patient Selected",
                                  description: `${dependent.name} (${dependent.relationship}) has been selected as the patient.`,
                                  variant: "default",
                                })
                              }}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            >
                              Select
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDependent(dependent.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {dependents.length === 0 && !showAddDependent && !showDependentOtpForm && (
                    <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">No dependents added yet</p>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setShowAddDependent(true)}
                        className="mt-2"
                        disabled={!isPolicyVerified}
                      >
                        Add family members covered under this policy
                      </Button>
                    </div>
                  )}

                  {showAddDependent && !showDependentOtpForm && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                      <h4 className="font-medium text-gray-800 mb-3">Add Dependent</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dependent-name">Full Name*</Label>
                          <Input
                            id="dependent-name"
                            placeholder="Enter dependent's full name"
                            value={newDependent.name}
                            onChange={(e) => setNewDependent({ ...newDependent, name: e.target.value })}
                          />
                          {dependentErrors.name && <p className="text-red-500 text-sm">{dependentErrors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dependent-relationship">Relationship*</Label>
                          <Select
                            value={newDependent.relationship}
                            onValueChange={(value) => setNewDependent({ ...newDependent, relationship: value })}
                          >
                            <SelectTrigger id="dependent-relationship">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {dependentErrors.relationship && (
                            <p className="text-red-500 text-sm">{dependentErrors.relationship}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dependent-gender">Gender*</Label>
                          <Select
                            value={newDependent.gender}
                            onValueChange={(value) => setNewDependent({ ...newDependent, gender: value })}
                          >
                            <SelectTrigger id="dependent-gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {dependentErrors.gender && <p className="text-red-500 text-sm">{dependentErrors.gender}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dependent-mrn">Medical Record Number (Optional)</Label>
                          <Input
                            id="dependent-mrn"
                            placeholder="Enter medical record number if available"
                            value={newDependent.medicalRecordNumber || ""}
                            onChange={(e) => setNewDependent({ ...newDependent, medicalRecordNumber: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowAddDependent(false)
                            setDependentErrors({})
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="button" onClick={addDependent}>
                          {isPolicyVerified ? "Verify & Add Dependent" : "Add Dependent"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {isPolicyVerified && policyDetails && policyDetails.dependents && policyDetails.dependents > 0 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="flex items-center text-amber-800 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">Policy Information</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Your policy shows {policyDetails.dependents} dependent
                        {policyDetails.dependents !== 1 ? "s" : ""} on record. Please ensure all dependents are
                        correctly listed for coverage.
                      </p>
                      {dependents.length < (policyDetails.dependents || 0) && (
                        <p className="text-sm text-amber-700 mt-2 font-medium">
                          You have {policyDetails.dependents - dependents.length} dependent
                          {policyDetails.dependents - dependents.length !== 1 ? "s" : ""} not yet added to this form.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="corporate" className="space-y-4 pt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Corporate Benefits</h3>
                  <p className="text-sm text-gray-600">
                    If you're covered under a corporate policy, you may be eligible for additional benefits and
                    discounts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="corporate-name">Corporate Account Name</Label>
                    <Input
                      id="corporate-name"
                      placeholder="Enter company name"
                      value={policyDetails?.corporateAccount || ""}
                      disabled={isPolicyVerified}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employee-id">Employee ID</Label>
                    <Input
                      id="employee-id"
                      placeholder="Enter employee ID"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      disabled={isPolicyVerified}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="corporate-discount" checked={corporateDiscount > 0} disabled={true} />
                    <Label htmlFor="corporate-discount" className="text-gray-700">
                      Eligible for corporate discount
                    </Label>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Corporate Policy Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Priority appointment scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Reduced waiting times</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Additional discount on patient responsibility</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Simplified claims processing</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Access to corporate wellness programs</span>
                    </li>
                  </ul>
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

      {isPolicyVerified && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Verification Progress</span>
            <span className="text-sm text-gray-500">
              {verificationStep === "policy"
                ? "1/3"
                : verificationStep === "ownership"
                  ? "2/3"
                  : verificationStep === "preauth"
                    ? "2/3"
                    : verificationStep === "complete"
                      ? "3/3"
                      : ""}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-hospital-600 h-2.5 rounded-full"
              style={{
                width:
                  verificationStep === "policy"
                    ? "33%"
                    : verificationStep === "ownership"
                      ? "66%"
                      : verificationStep === "preauth"
                        ? "66%"
                        : verificationStep === "complete"
                          ? "100%"
                          : "0%",
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Policy Verification</span>
            <span>Ownership Verification</span>
            <span>Complete</span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
        <p className="font-medium">Important Information:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>All insurance details are verified in real-time with your provider</li>
          <li>Pre-authorization may be required for certain services and procedures</li>
          <li>Corporate policy holders may be eligible for additional benefits</li>
          <li>Your insurance card and a valid ID will be required at check-in</li>
          <li>Co-payments and deductibles are collected at the time of service</li>
          <li>For billing inquiries, please contact our finance department at finance@hospital.com</li>
        </ul>

        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="font-medium mb-1">Need assistance?</p>
          <p>Our insurance specialists are available Monday-Friday, 8:00 AM - 5:00 PM at +254 700 520 0009</p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-hospital-600 hover:bg-hospital-700 mt-4"
        disabled={isSubmitting || (isPolicyVerified && !otpVerified) || (preAuthRequired && !preAuthVerified)}
      >
        {isSubmitting
          ? "Verifying Insurance..."
          : isPolicyVerified && !otpVerified
            ? "Please Verify Policy Ownership"
            : preAuthRequired && !preAuthVerified
              ? "Pre-Authorization Required"
              : "Verify & Complete"}
      </Button>
    </form>
  )
}

export default InsuranceDetails

