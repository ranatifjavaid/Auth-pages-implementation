import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SignUp from "./SignUp";
import { STRIPE_KEY } from "../../../Routes/AxiosConfig";

export default function index(props) {
  const stripePromise = loadStripe(STRIPE_KEY);
  return (
    <Elements stripe={stripePromise}>
      <SignUp />
    </Elements>
  );
}
