import React, { useState, useEffect } from 'react';
import './PaymentDetails.css';  // You can add styling as per your needs

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const userEmail = localStorage.getItem("email"); // Assuming user email is stored in localStorage after login

      if (!userEmail) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/payment/payment/details?userEmail=${userEmail}`);
        
        if (!response.ok) {
          throw new Error("Error fetching payment details");
        }

        const data = await response.json();
        if (data.success) {
          setPayments(data.payments);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  if (loading) {
    return <p>Loading payment details...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="payment-details-container">
      <h1>Your Payment Details</h1>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="payment-list">
          {payments.map((payment) => (
            <div className="payment-item" key={payment._id}>
              <h3>{payment.courseTitle}</h3>
              <p><strong>Amount:</strong> ₹{payment.amount}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Payment ID:</strong> {payment._id}</p>
              <p><strong>Order ID:</strong> {payment.razorpayOrderId}</p>
              <p><strong>Payment Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
