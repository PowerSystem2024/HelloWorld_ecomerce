import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePayment } from "./context/PaymentContext";
import Home from "./pages/Home";
import PaymentSuccessView from "./pages/PaymentSuccessView";
import PaymentFailureView from "./pages/PaymentFailureView";
import PaymentPendingView from "./pages/PaymentPendingView";

export default function PaymentHandler() {
  const { paymentStatus } = usePayment();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status")) {
      setSearchParams({}); // limpia query params
    }
  }, [searchParams, setSearchParams]);

  if (!paymentStatus) return <Home />;

  switch (paymentStatus) {
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
