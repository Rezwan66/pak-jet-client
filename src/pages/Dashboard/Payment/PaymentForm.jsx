import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card || card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      //   console.log('[error]', error);
      setError(error.message);
    } else {
      setError('');
      console.log('[PaymentMethod]', paymentMethod);
    }
  };
  return (
    <>
      <div className="min-h-screen px-2 pt-10 md:pt-20 lg:pt-40">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-base-200 p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
        >
          <CardElement className="p-2 border rounded" />
          <button
            type="submit"
            className="btn btn-primary w-full text-black"
            disabled={!stripe}
          >
            Pay For Parcel Pickup
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
};
export default PaymentForm;
