import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePayment } from "./context/PaymentContext";
import Home from "./pages/Home";
import PaymentSuccessView from "./pages/PaymentSuccessView";
import PaymentFailureView from "./pages/PaymentFailureView";
import PaymentPendingView from "./pages/PaymentPendingView";

export default function PaymentHandler() {
  const { paymentStatus, setPaymentStatus } = usePayment();
  const [searchParams, setSearchParams] = useSearchParams();

  // Leemos el status de la query param si paymentStatus no está definido
  const statusFromQuery = searchParams.get("status");

  const status = paymentStatus || statusFromQuery;

    useEffect(() => {
    if (statusFromQuery) {
      setPaymentStatus(null);   // limpia el estado del contexto
      setSearchParams({});      // limpia la URL
    }
  }, [statusFromQuery, setSearchParams, setPaymentStatus]);

  switch (status) {
    case "success":
      return <PaymentSuccessView />;
    case "failure":
      return <PaymentFailureView />;
    case "pending":
      return <PaymentPendingView />;
    default:
      return <Home />;
  }
}
