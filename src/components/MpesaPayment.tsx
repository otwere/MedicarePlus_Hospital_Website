
import React, { useState } from "react";
import { Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface MpesaPaymentProps {
  amount: number;
  onPaymentComplete: () => void;
}

const MpesaPayment = ({ amount, onPaymentComplete }: MpesaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string>("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setErrors("");
  };

  const initiatePayment = () => {
    // Validate phone number (simple validation for demo)
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrors("Please enter a valid phone number");
      return;
    }

    // Simulate payment process
    setStatus("processing");
    
    // Simulate API call to MPesa
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setStatus("success");
        toast.success("MPesa payment request sent successfully");
        setTimeout(onPaymentComplete, 2000); // Move to next step after showing success
      } else {
        setStatus("error");
        toast.error("Payment failed. Please try again.");
      }
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Invoiced Amount :</span>
          <span className="font-bold text-hospital-700">KES {amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Enter MPesa Phone Number</h3>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <Input 
              placeholder="Enter your MPesa phone number" 
              className="rounded-l-none"
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={status === "processing" || status === "success"}
            />
          </div>
          {errors && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors}
            </p>
          )}
        </div>
        
        <div className="relative">
          <Button 
            onClick={initiatePayment} 
            className="w-full bg-hospital-600 hover:bg-hospital-700"
            disabled={status === "processing" || status === "success"}
          >
            {status === "processing" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Payment Sent
              </>
            ) : (
              "Request MPesa Payment"
            )}
          </Button>
          
          {status === "success" && (
            <Badge animate variant="success" className="absolute -top-2 -right-2">
              Success
            </Badge>
          )}
        </div>
        
        {status === "success" && (
          <div className="bg-green-50 p-3 rounded-md border border-green-200 text-green-800 text-sm flex items-start gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">MPesa request sent</p>
              <p>Check your phone to complete the payment. When done, we'll process your appointment.</p>
            </div>
          </div>
        )}
        
        {status === "error" && (
          <div className="bg-red-50 p-3 rounded-md border border-red-200 text-red-800 text-sm flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Payment failed</p>
              <p>There was an issue processing your payment. Please try again or choose another payment method.</p>
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-500 mt-4">
          A payment request will be sent to your MPesa account. Please complete the payment on your phone.
        </p>
      </div>
    </div>
  );
};

export default MpesaPayment;
