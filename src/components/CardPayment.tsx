
import React, { useState } from "react";
import { CreditCard, Calendar, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CardPaymentProps {
  amount: number;
  onPaymentComplete: () => void;
}

const CardPayment = ({ amount, onPaymentComplete }: CardPaymentProps) => {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value
    });
    
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!cardInfo.number || cardInfo.number.length < 16) {
      newErrors.number = "Please enter a valid card number";
    }
    
    if (!cardInfo.name) {
      newErrors.name = "Please enter the cardholder name";
    }
    
    if (!cardInfo.expiry || !cardInfo.expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = "Please enter expiry in MM/YY format";
    }
    
    if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = () => {
    if (!validateForm()) return;
    
    setStatus("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setStatus("success");
        toast.success("Payment processed successfully");
        setTimeout(onPaymentComplete, 2000);
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
          <span className="text-gray-600">Paymen Amount :</span>
          <span className="font-bold text-hospital-700">KES {amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <div className="flex items-center">
            <div className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
              <CreditCard className="h-5 w-5 text-gray-500" />
            </div>
            <Input 
              name="number"
              placeholder="1234 5678 9012 3456" 
              className="rounded-l-none"
              value={cardInfo.number}
              onChange={handleChange}
              maxLength={19}
              disabled={status === "processing" || status === "success"}
            />
          </div>
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <Input 
            name="name"
            placeholder="Full Names" 
            value={cardInfo.name}
            onChange={handleChange}
            disabled={status === "processing" || status === "success"}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <div className="flex items-center">
              <div className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <Input 
                name="expiry"
                placeholder="MM/YY" 
                className="rounded-l-none"
                value={cardInfo.expiry}
                onChange={handleChange}
                maxLength={5}
                disabled={status === "processing" || status === "success"}
              />
            </div>
            {errors.expiry && (
              <p className="text-red-500 text-sm">{errors.expiry}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <div className="flex items-center">
              <div className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <Input 
                name="cvv"
                placeholder="123" 
                className="rounded-l-none"
                value={cardInfo.cvv}
                onChange={handleChange}
                maxLength={4}
                type="password"
                disabled={status === "processing" || status === "success"}
              />
            </div>
            {errors.cvv && (
              <p className="text-red-500 text-sm">{errors.cvv}</p>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Button 
            onClick={processPayment} 
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
                Payment Successful
              </>
            ) : (
              "Pay Now"
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
              <p className="font-medium">Payment successful</p>
              <p>Your payment has been processed successfully. We'll send a confirmation email shortly.</p>
            </div>
          </div>
        )}
        
        {status === "error" && (
          <div className="bg-red-50 p-3 rounded-md border border-red-200 text-red-800 text-sm flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Payment failed</p>
              <p>There was an issue processing your payment. Please check your card details and try again.</p>
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Lock className="h-4 w-4" /> Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default CardPayment;
