"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { PrinterIcon } from "lucide-react"

interface PrintReceiptButtonProps {
  paymentData: {
    patientName?: string
    serviceType?: string
    amount?: number
    paymentMethod?: string
    paymentDate?: string
    transactionId?: string
    invoiceNumber?: string
    doctorName?: string
    appointmentDate?: string
    appointmentTime?: string
    email?: string
    phone?: string
    address?: string
    insuranceProvider?: string
    insurancePolicyNumber?: string
    medicalRecordNumber?: string
  }
}

const PrintReceiptButton: React.FC<PrintReceiptButtonProps> = ({ paymentData }) => {
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined) return "0.00"
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const maskPolicyNumber = (policyNumber: string | undefined): string => {
    if (!policyNumber || policyNumber.length < 5) return policyNumber || ""

    const length = policyNumber.length
    const startChars = Math.floor((length - 3) / 2)
    const endChars = length - startChars - 3

    return policyNumber.substring(0, startChars) + "***" + policyNumber.substring(startChars + 3)
  }

  const maskEmail = (email: string | undefined): string => {
    if (!email || !email.includes("@")) return email || ""

    const [username, domain] = email.split("@")

    if (username.length <= 3) {
      return `${username}@${domain}`
    }

    const visibleChars = Math.min(3, Math.floor(username.length / 3))
    const maskedLength = username.length - visibleChars * 2

    const firstPart = username.substring(0, visibleChars)
    const lastPart = username.substring(username.length - visibleChars)
    const maskedPart = "*".repeat(Math.max(3, maskedLength))

    return `${firstPart}${maskedPart}${lastPart}@${domain}`
  }

  const maskPhoneNumber = (phone: string | undefined): string => {
    if (!phone || phone.length < 6) return phone || ""

    // Remove any non-digit characters for consistent formatting
    const digitsOnly = phone.replace(/\D/g, "")

    if (digitsOnly.length < 6) return phone

    const firstPart = phone.substring(0, Math.min(4, Math.floor(phone.length / 3)))
    const lastPart = phone.substring(phone.length - 4)

    // Find the middle part to replace with asterisks
    const middleStartIndex = firstPart.length
    const middleEndIndex = phone.length - lastPart.length
    const middleLength = middleEndIndex - middleStartIndex

    // Create the masked middle part with the same length as the original
    const maskedMiddle = "*".repeat(Math.min(3, middleLength))

    return `${firstPart}${maskedMiddle}${lastPart}`
  }

  const getOrGenerateInvoiceNumber = (): string => {
    const storedInvoiceNumber = localStorage.getItem("invoiceNumber")
    if (storedInvoiceNumber && paymentData.invoiceNumber === undefined) {
      return storedInvoiceNumber
    }

    const newInvoiceNumber =
      paymentData.invoiceNumber ||
      `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`

    localStorage.setItem("invoiceNumber", newInvoiceNumber)
    return newInvoiceNumber
  }

  const getOrGenerateControlUnitNo = (): string => {
    const storedControlUnitNo = localStorage.getItem("controlUnitNo")
    if (storedControlUnitNo && paymentData.transactionId === undefined) {
      return storedControlUnitNo
    }

    const newControlUnitNo = `CU-${Date.now().toString().substring(5)}`
    localStorage.setItem("controlUnitNo", newControlUnitNo)
    return newControlUnitNo
  }

  const getOrGenerateReceiptId = (): string => {
    const storedReceiptId = localStorage.getItem("receiptId")
    if (storedReceiptId && paymentData.transactionId === undefined) {
      return storedReceiptId
    }

    const newReceiptId = `REC-${Date.now().toString().substring(7)}`
    localStorage.setItem("receiptId", newReceiptId)
    return newReceiptId
  }

  const handlePrintReceipt = () => {
    // Create a new window for the receipt
    const receiptWindow = window.open("", "_blank", "width=800,height=600")

    if (!receiptWindow) {
      alert("Please allow pop-ups to print your receipt")
      return
    }

    // Format the payment date
    const formattedDate = paymentData.paymentDate
      ? new Date(paymentData.paymentDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

    // Generate random transaction ID if not provided
    const transactionId =
      paymentData.transactionId ||
      `TXN-${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`

    // Calculate VAT (16%)
    const vatRate = 0.16
    // Calculate pre-VAT amount (amount paid ÷ 1.16)
    const preVatAmount = paymentData.amount ? paymentData.amount / (1 + vatRate) : 0
    const vatAmount = paymentData.amount ? paymentData.amount - preVatAmount : 0
    const totalWithVat = paymentData.amount || 0

    // Use the persistent invoice number
    const invoiceNumber = getOrGenerateInvoiceNumber()

    // Use the persistent Control Unit No
    const controlUnitNo = getOrGenerateControlUnitNo()

    // Use the persistent Receipt ID
    const receiptId = getOrGenerateReceiptId()

    // Determine payment status based on payment method
    const isPaid = paymentData.paymentMethod !== "cash"
    const paymentStatus = isPaid ? "Paid" : "Unpaid"
    const statusColor = isPaid ? "#0d904f" : "#e05252"
    const statusBgColor = isPaid ? "#e6f7ed" : "#fde8e8"

    // HTML content for the receipt with A4 dimensions
    const receiptContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Receipt - MediCare Plus</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f9f9f9;
          }
          @page {
            size: A4;
            margin: 0;
          }
          .receipt-container {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            position: relative;
            background: #fff;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .container {
            padding: 8mm 8mm;
            box-sizing: border-box;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .receipt-header {
            background: linear-gradient(135deg, #4d7a8c 0%, #2a5769 100%);
            padding: 8px;
            color: white;
            position: relative;
            overflow: hidden;
            border-radius: 8px 8px 0 0;
            margin-bottom: 12px;
          }
          .receipt-header:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.05)' fillRule='evenodd'/%3E%3C/svg%3E");
            opacity: 0.3;
            z-index: 0;
          }
          .logo-section {
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
            margin-bottom: 8px;
          }
          .logo {
            width: 45px;
            height: 45px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .logo-text {
            font-weight: 700;
            font-size: 18px;
            line-height: 1.2;
          }
          .tagline {
            font-size: 11px;
            font-weight: 300;
            opacity: 0.9;
          }
          .receipt-title {
            font-weight: 600;
            text-color: #00FF00;
            font-size: 16px;
            margin-top: 0;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
          }
          .company-details {
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            font-size: 10px;
          }
          .company-details > div {
            margin-right: 16px;
          }
          .receipt-body {
            padding: 8px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .receipt-section {
            margin-bottom: 12px;
          }
          .section-title {
            color: #4d7a8c;
            font-weight: 600;
            font-size: 13px;
            margin-top: 8px;
            margin-bottom: 6px;
            padding-bottom: 4px;
            border-bottom: 1px solid #eaeaea;
          }
          .receipt-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            font-size: 11px;
          }
          .receipt-label {
            color: #666;
            flex: 1;
          }
          .receipt-value {
            font-weight: 500;
            color: #333;
            flex: 2;
            text-align: right;
          }
          .amount {
            font-size: 11px;
            font-weight: 600;
            color: #4d7a8c;
          }
          .transaction-id {
            font-family: 'Courier New', monospace;
            background-color: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
          }
          .payment-status {
            display: inline-block;
            background-color: ${statusBgColor};
            color: ${statusColor};
            padding: 2px 8px;
            border-radius: 50px;
            font-weight: 500;
            font-size: 11px;
          }
          .receipt-footer {
            padding: 8px;
            background-color: #f9f9f9;
            border-top: 1px solid #eaeaea;
            text-align: center;
            font-size: 10px;
            margin-top: auto;
          }
          .thank-you {
            font-weight: 600;
            color: #4d7a8c;
            margin-bottom: 4px;
          }
          .footer-contact {
            color: #666;
            margin-bottom: 0px;
          }
          .digital-signature {
            margin-top: 8px;
            text-align: center;
            font-size: 9px;
            color: #999;
          }
          .qr-code {
            text-align: center;
            margin: 8px 0;
          }
          .qr-code img {
            width: 80px;
            height: 80px;
          }
          .qr-code-text {
            font-size: 9px;
            color: #666;
            margin-top: 2px;
          }
          .details-columns {
            display: flex;
            justify-content: space-between;
            gap: 20px;
          }
          .details-column {
            flex: 1;
          }
          .payment-notice {
            margin-top: 10px;
            padding: 8px;
            background-color: #fff9db;
            border-left: 3px solid #ffd43b;
            font-size: 10px;
            color: #664d03;
            border-radius: 4px;
            display: ${isPaid ? "none" : "block"};
          }
          .payment-notice-title {
            font-weight: 600;
            margin-bottom: 2px;
          }
          .disclaimer-section {
            margin-top: 15px;
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            font-size: 9px;
            color: #495057;
          }
          .disclaimer-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #4d7a8c;
            font-size: 10px;
          }
          .disclaimer-item {
            margin-bottom: 4px;
            display: flex;
          }
          .disclaimer-item:before {
            content: "•";
            margin-right: 5px;
          }
          @media print {
            body {
              background-color: white;
            }
            .receipt-container {
              box-shadow: none;
              margin: 0;
              height: 100%;
              width: 100%;
            }
            .print-note, .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="container">
            <div class="receipt-header">
              <div class="logo-section">
                <div class="logo">
                  <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z" stroke="#4d7a8c" strokeWidth="3"/>
                    <path d="M13 20H27" stroke="#4d7a8c" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M20 13V27" stroke="#4d7a8c" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div class="logo-text">MediCare Plus</div>
                  <div class="tagline">Advanced Healthcare Solutions</div>
                </div>
              </div>
              
              <h1 class="receipt-title">Payment Receipt</h1>
              
              <div class="company-details">
                <div>
                  <div>123 Healthcare Avenue</div>
                  <div>Medical District , Nairobi - Kenya</div>
                  <div>KRA PIN : P005424534R</div>
                </div>
                <div>
                  <div>Phone : +254 700 520 008</div>
                  <div>Email : billing@medicareplus.com</div>
                  <div>Web : www.medicareplus.com</div>
                </div>
              </div>
            </div>
            
            <div class="receipt-body">
              <div class="details-columns">
                <div class="details-column">
                  <div class="receipt-section">
                    <div class="section-title">Patient Information</div>
                    <div class="receipt-row">
                      <div class="receipt-label">Patient Name :</div>
                      <div class="receipt-value">${paymentData.patientName || "N/A"}</div>
                    </div>
                    ${
                      paymentData.email
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Email :</div>
                      <div class="receipt-value">${maskEmail(paymentData.email)}</div>
                    </div>
                    `
                        : ""
                    }
                    ${
                      paymentData.phone
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Phone :</div>
                      <div class="receipt-value">${maskPhoneNumber(paymentData.phone)}</div>
                    </div>
                    `
                        : ""
                    }
                    ${
                      paymentData.address
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Address:</div>
                      <div class="receipt-value">${paymentData.address}</div>
                    </div>
                    `
                        : ""
                    }
                    ${
                      paymentData.medicalRecordNumber
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Medical Record #:</div>
                      <div class="receipt-value">${paymentData.medicalRecordNumber}</div>
                    </div>
                    `
                        : ""
                    }
                  </div>
                  
                  <div class="receipt-section">
                    <div class="section-title">Appointment Details</div>
                    <div class="receipt-row">
                      <div class="receipt-label">Service Type :</div>
                      <div class="receipt-value">${paymentData.serviceType || "Medical Services"}</div>
                    </div>
                    ${
                      paymentData.doctorName
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Doctor :</div>
                      <div class="receipt-value">${paymentData.doctorName}</div>
                    </div>
                    `
                        : ""
                    }
                    ${
                      paymentData.appointmentDate
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Appointment Date :</div>
                      <div class="receipt-value">${paymentData.appointmentDate}</div>
                    </div>
                    `
                        : ""
                    }
                    ${
                      paymentData.appointmentTime
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label">Appointment Time :</div>
                      <div class="receipt-value">${paymentData.appointmentTime}</div>
                    </div>
                    `
                        : ""
                    }
                  </div>
                  ${
                    paymentData.insuranceProvider
                      ? `
                  <div class="receipt-section">
                    <div class="section-title">Insurance Information</div>
                    <div class="receipt-row">
                      <div class="receipt-label">Insurance Provider :</div>
                      <div class="receipt-value">${paymentData.insuranceProvider}</div>
                    </div>
                    ${
                      paymentData.insurancePolicyNumber
                        ? `
                    <div class="receipt-row">
                      <div class="receipt-label"> Policy Number :</div>
                      <div class="receipt-value">${maskPolicyNumber(paymentData.insurancePolicyNumber)}</div>
                    </div>
                    `
                        : ""
                    }
                  </div>
                  `
                      : ""
                  }
                </div>
                
                <div class="details-column">
                  <div class="receipt-section">
                    <div class="section-title">Payment Information</div>
                    <div class="receipt-row">
                      <div class="receipt-label"> Invoiced Amount :</div>
                      <div class="receipt-value amount">KES ${formatCurrency(paymentData.amount)}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Payment Method :</div>
                      <div class="receipt-value">${paymentData.paymentMethod === "cash" ? "Pay at Hospital" : paymentData.paymentMethod || "N/A"}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Payment Date :</div>
                      <div class="receipt-value">${formattedDate}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Transaction ID :</div>
                      <div class="receipt-value transaction-id">${transactionId}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Invoice Number :</div>
                      <div class="receipt-value transaction-id">${invoiceNumber}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Subtotal :</div>
                      <div class="receipt-value">KES ${formatCurrency(preVatAmount)}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">VAT (16%) :</div>
                      <div class="receipt-value">KES ${formatCurrency(vatAmount)}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Total Amount :</div>
                      <div class="receipt-value amount">KES ${formatCurrency(totalWithVat)}</div>
                    </div>
                    <div class="receipt-row">
                      <div class="receipt-label">Invoice Status :</div>
                      <div class="receipt-value"><span class="payment-status">${paymentStatus}</span></div>
                    </div>
                  </div>
                  
                  <div class="payment-notice">
                    <div class="payment-notice-title">Payment Pending</div>
                    <div>Please complete your payment at the hospital reception during your appointment. This receipt confirms your appointment booking only.</div>
                  </div>
                  
                </div>
              </div>
              
              <div class="disclaimer-section">
                <div class="disclaimer-title">Important Information</div>
                <div class="disclaimer-item">All payments are non-refundable.</div>
                <div class="disclaimer-item">If you are unable to attend your scheduled appointment, please notify us at least 24 hours in advance via phone (+254 700 520 008) or email (appointments@medicareplus.com).</div>
                <div class="disclaimer-item">Missed appointments without prior notification may result in a cancellation fee for future bookings.</div>
                <div class="disclaimer-item">To reschedule a missed appointment, please contact our front office.</div>
                <div class="disclaimer-item">MediCare Plus reserves the right to reschedule appointments in case of emergencies or unforeseen circumstances.</div>
              </div>
              
              <div class="digital-signature">
                <p>This is an electronically generated receipt and does not require a physical signature.</p>
                <p>Control Unit No : ${controlUnitNo}</p>
                <p>eTMIS KRA Invoice Receipt ID : ${receiptId}</p>
                <div class="qr-code" style="margin-top: 15px;">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=MEDICAREPLUS-RECEIPT-${transactionId}" alt="Receipt QR Code">
                  <div class="qr-code-text">Scan to verify receipt</div>
                </div>
                <p>Generated on : ${new Date().toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZoneName: "short",
                })}</p>
                
              </div>
            </div>
            
            <div class="receipt-footer">
              <p class="thank-you">Thank you for choosing MediCare Plus for your healthcare needs!</p>
              <p class="footer-contact">If you have any questions about this receipt, please contact our Billing Department.</p>
              <p class="footer-contact">billing@medicareplus.com | +254 700 520 008</p>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            // Auto print when page loads
            window.print();
          };
        </script>
      </body>
      </html>
    `

    // Write the content to the new window
    receiptWindow.document.write(receiptContent)
    receiptWindow.document.close()
  }

  return (
    <Button onClick={handlePrintReceipt} className="bg-hospital-600 hover:bg-hospital-700 text-white">
      <PrinterIcon className="mr-2 h-4 w-4" />
      Print Receipt
    </Button>
  )
}

export default PrintReceiptButton

