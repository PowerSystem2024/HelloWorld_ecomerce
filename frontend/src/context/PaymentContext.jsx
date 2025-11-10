import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "success" || status === "failure" || status === "pending") {
      setPaymentStatus(status);
    }
  }, [location.search]);

  return (
    <PaymentContext.Provider value={{ paymentStatus, setPaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}
