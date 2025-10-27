import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Payment = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};
export default Payment;
