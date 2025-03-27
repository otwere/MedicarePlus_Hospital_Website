
import { useState } from "react";
import { Copy, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BankTransferPaymentProps {
  amount: number;
  onPaymentComplete: () => void;
}

const BankTransferPayment = ({ amount, onPaymentComplete }: BankTransferPaymentProps) => {
  const [referenceNo, setReferenceNo] = useState("");
  const [errors, setErrors] = useState<string>("");
  
  const bankDetails = {
    accountName: "MediCare Plus Hospital",
    accountNumber: "1234567890",
    bankName: "National Bank",
    swiftCode: "NBCMPLUSXXX",
    reference: `APP-${Math.floor(100000 + Math.random() * 900000)}`
  };
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard`);
    });
  };
  
  const handleSubmit = () => {
    if (!referenceNo) {
      setErrors("Please enter your transaction reference number");
      return;
    }
    
    toast.success("Reference number submitted successfully");
    onPaymentComplete();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Invoiced Amount :</span>
          <span className="font-bold text-hospital-700">KES {amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Bank Transfer Instructions</h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bank Name :</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{bankDetails.bankName}</span>
                <button 
                  onClick={() => copyToClipboard(bankDetails.bankName, "Bank name")}
                  className="text-gray-500 hover:text-hospital-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Account Name :</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{bankDetails.accountName}</span>
                <button 
                  onClick={() => copyToClipboard(bankDetails.accountName, "Account name")}
                  className="text-gray-500 hover:text-hospital-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Account Number :</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{bankDetails.accountNumber}</span>
                <button 
                  onClick={() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                  className="text-gray-500 hover:text-hospital-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Swift Code :</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{bankDetails.swiftCode}</span>
                <button 
                  onClick={() => copyToClipboard(bankDetails.swiftCode, "Swift code")}
                  className="text-gray-500 hover:text-hospital-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Reference Number :</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-hospital-700">{bankDetails.reference}</span>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.reference, "Reference number")}
                    className="text-gray-500 hover:text-hospital-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-red-600 mt-1">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                Important : Include this reference number with your transfer
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm">
            <h4 className="font-medium mb-2">Instructions :</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Make a transfer to the account details above</li>
              <li>Include the reference number with your transfer</li>
              <li>Enter the transaction reference number below after payment</li>
            </ol>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Enter Transaction Reference Number
            </label>
            <Input 
              placeholder="Enter the reference number from your bank" 
              value={referenceNo}
              onChange={(e) => {
                setReferenceNo(e.target.value);
                setErrors("");
              }}
            />
            {errors && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors}
              </p>
            )}
          </div>
          
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-hospital-600 hover:bg-hospital-700"
          >
            Confirm Bank Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BankTransferPayment;
