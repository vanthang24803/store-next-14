"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

type PaymentType = "cod" | "bank" | "momo";

interface PaymentTypeProp {
  cod: boolean;
  bank: boolean;
  momo: boolean;
  handleBankChange: (paymentType: PaymentType) => void;
}

export const Payment = ({
  cod,
  bank,
  momo,
  handleBankChange,
}: PaymentTypeProp) => {
  return (
    <>
      <span className="font-bold text-lg">Phương thức thanh toán</span>
      <div className="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
              onClick={() => handleBankChange("cod")}
            >
              {cod && <Check className="w-4 h-4" />}
            </div>
            <Label htmlFor="cod">Thanh toán khi giao hàng (COD)</Label>
          </div>
          <Separator />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
              onClick={() => handleBankChange("bank")}
            >
              {bank && <Check className="w-4 h-4" />}
            </div>
            <Label htmlFor="bank">Chuyển khoản qua ngân hàng</Label>
          </div>
          <Separator />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center border border-neutral-700"
              onClick={() => handleBankChange("momo")}
            >
              {momo && <Check className="w-4 h-4" />}
            </div>
            <Label htmlFor="momo">Ví MoMo</Label>
          </div>
        </div>
      </div>
    </>
  );
};
