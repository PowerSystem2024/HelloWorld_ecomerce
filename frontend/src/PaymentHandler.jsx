import { useEffect } from "react";
import { usePayment } from "./context/PaymentContext";
import Home from "./pages/Home";
import PaymentSuccessView from "./pages/PaymentSuccessView";
import PaymentFailureView from "./pages/PaymentFailureView";
import PaymentPendingView from "./pages/PaymentPendingView";

export default function PaymentHandler() {
  const { paymentStatus, setPaymentStatus } = usePayment();

  const status = paymentStatus;

  const clearStatus = () => {
    setPaymentStatus(null);
  };

  switch (status) {
    case "success":
      return <PaymentSuccessView onExit={clearStatus} />;
    case "failure":
      return <PaymentFailureView onExit={clearStatus} />;
    case "pending":
      return <PaymentPendingView onExit={clearStatus} />;
    default:
      return <Home />;
  }
}
