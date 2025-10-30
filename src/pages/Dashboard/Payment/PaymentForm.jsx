import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useAxiosSecure } from '../../../hooks/useAxiosSecure';
import Spinner from '../../../components/Spinner';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Spinner />;
  }

  //   console.log(parcelInfo);
  const amount = parcelInfo?.cost;
  const amountInCents = amount * 100;

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

    // Step-2: CREATE payment intent
    try {
      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
        parcelId,
      });
      //   console.log('response from intent-->', res);
      const { clientSecret } = res.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        },
      });
      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment Succeeded!', result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen px-2 pt-10 md:pt-20 lg:pt-40">
        <h2 className="text-3xl font-bold mb-6 text-center">
          💶 Pay for your parcel
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-base-200 py-10 px-6 rounded-xl shadow-md w-full max-w-md mx-auto"
        >
          <CardElement className="p-2 border rounded" />
          <button
            type="submit"
            className="btn btn-primary w-full text-black"
            disabled={!stripe}
          >
            Pay &euro;{amount}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
};
export default PaymentForm;
