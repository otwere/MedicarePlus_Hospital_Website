
import React from "react";
import { CreditCard, Smartphone, Landmark, Banknote } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type PaymentMethod = "card" | "mobile_money" | "bank_transfer" | "insurance";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange as (value: string) => void}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className={`relative flex items-center space-x-2 space-y-0 rounded-md border p-4 shadow-sm transition-all hover:border-hospital-200 cursor-pointer ${value === 'card' ? 'border-hospital-500 bg-hospital-50' : ''}`}>
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card" className="font-normal flex-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-hospital-500" />
            <span>Credit/Debit Card</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Pay using Visa, Mastercard or American Express</p>
        </Label>
      </div>
      
      <div className={`relative flex items-center space-x-2 space-y-0 rounded-md border p-4 shadow-sm transition-all hover:border-hospital-200 cursor-pointer ${value === 'mobile_money' ? 'border-hospital-500 bg-hospital-50' : ''}`}>
        <RadioGroupItem value="mobile_money" id="mobile_money" />
        <Label htmlFor="mobile_money" className="font-normal flex-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-hospital-500" />
            <span>Mobile Money</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Pay using MPesa or other mobile money services</p>
        </Label>
      </div>
      
      <div className={`relative flex items-center space-x-2 space-y-0 rounded-md border p-4 shadow-sm transition-all hover:border-hospital-200 cursor-pointer ${value === 'bank_transfer' ? 'border-hospital-500 bg-hospital-50' : ''}`}>
        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
        <Label htmlFor="bank_transfer" className="font-normal flex-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-hospital-500" />
            <span>Bank Transfer</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Pay directly from your bank account</p>
        </Label>
      </div>
      
      <div className={`relative flex items-center space-x-2 space-y-0 rounded-md border p-4 shadow-sm transition-all hover:border-hospital-200 cursor-pointer ${value === 'insurance' ? 'border-hospital-500 bg-hospital-50' : ''}`}>
        <RadioGroupItem value="insurance" id="insurance" />
        <Label htmlFor="insurance" className="font-normal flex-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-hospital-500" />
            <span>Pay via Insurance</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Payment via Insurance Cover</p>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
