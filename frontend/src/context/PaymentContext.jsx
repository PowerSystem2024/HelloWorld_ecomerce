import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "success" || status === "failure" || status === "pending") {
      setPaymentStatus(status);
      navigate(location.pathname, { replace: true }); // limpia query params
    }
  }, [location.search, location.pathname, navigate]);

  return (
    <PaymentContext.Provider value={{ paymentStatus, setPaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}
