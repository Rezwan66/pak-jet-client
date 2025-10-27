import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card || card == null) {
      return;
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement>
            <button type="submit" disabled={!stripe}>
              Pay For Parcel Pickup
            </button>
          </CardElement>
        </form>
      </div>
    </>
  );
};
export default PaymentForm;
