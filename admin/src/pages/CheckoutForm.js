import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ courseId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded yet!');
      setLoading(false);
      return;
    }

    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage('Payment successful! Enjoy your course.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default CheckoutForm;
