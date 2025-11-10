import { usePayment } from "./context/PaymentContext";
import Home from "./pages/Home";
import PaymentSuccessView from "./pages/PaymentSuccessView";
import PaymentFailureView from "./pages/PaymentFailureView";
import PaymentPendingView from "./pages/PaymentPendingView";

function PaymentHandler() {
  const { paymentStatus } = usePayment();

  useEffect(() => {
    if (searchParams.get("status")) {
      setSearchParams({}); // limpia query params
    }
  }, []);

  if (!paymentStatus) return <Home />; // si no hay status, mostramos Home

  switch (paymentStatus) {
    case "success":
      return <PaymentSuccessView />;
    case "failure":
      return <PaymentFailureView />;
    case "pending":
      return <PaymentPendingView />;
    default:
      return <Home />; // fallback
  }
}

export default PaymentHandler;
