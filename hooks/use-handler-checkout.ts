import { useState } from "react";

type CheckboxType = "send" | "store";
type PaymentType = "cod" | "bank" | "momo";

export default function useHandlerCheckout() {
  const [sendChecked, setSendChecked] = useState(true);
  const [storeChecked, setStoreChecked] = useState(false);
  const [payment, setPayment] = useState<PaymentType | null>("cod");

  const handleBankChange = (paymentType: PaymentType) => {
    setPayment((current) => (current === paymentType ? "cod" : paymentType));
  };

  const handleCheckboxChange = (checkboxType: CheckboxType) => {
    if (checkboxType === "send") {
      setSendChecked((current) => !current);
      setStoreChecked(false);
      setPayment("cod");
    } else if (checkboxType === "store") {
      setStoreChecked((current) => !current);
      setSendChecked(false);
      setPayment(null);
    }
  };

  return {
    sendChecked,
    storeChecked,
    payment,
    handleBankChange,
    handleCheckboxChange,
  };
}
