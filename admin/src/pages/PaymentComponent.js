import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentComponent.css";

function PaymentComponent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [razorpayLoadError, setRazorpayLoadError] = useState(false);
  const [razorpaySignature, setRazorpaySignature] = useState(""); // To store Razorpay signature

  const { courseId } = state || {};

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = (error) => {
        console.error("Razorpay script failed to load", error);
        setRazorpayLoadError(true);
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/course/course/${courseId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    }

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handlePayment = async () => {
    try {
      if (!course || !userEmail) {
        throw new Error("Course or user data is missing.");
      }

      if (!razorpayLoaded) {
        throw new Error("Razorpay SDK is not loaded.");
      }

      const response = await fetch("http://localhost:5000/api/payment/payment/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          courseId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error("Failed to create order.");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: "Course Payment",
        order_id: orderData.orderId,
        handler: async (response) => {
          const verifyResponse = await fetch("http://localhost:5000/api/payment/payment/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            alert("Payment successful");
            setRazorpaySignature(response.razorpay_signature); // Store Razorpay signature
            navigate("/dashboard");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          email: userEmail,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment");
    }
  };

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (razorpayLoadError) {
    return <p style={{ color: "red" }}>Error: Failed to load Razorpay SDK.</p>;
  }

  return (
    <div className="payment-container">
      {course && (
        <>
          <h2>Course Payment</h2>
          <div className="course-details">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Price:</strong> ₹{course.price}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
          </div>
          <button className="payment-button" onClick={handlePayment}>
            Proceed to Payment
          </button>
          {razorpaySignature && (
            <div>
              <h4>Payment Signature:</h4>
              <p>{razorpaySignature}</p> {/* Display Razorpay signature */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PaymentComponent;
