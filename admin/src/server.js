const express = require("express");
const stripe = require("stripe")("your-secret-key");  // Replace with your actual secret key
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount should be in cents (e.g., 1000 = $10)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",  // Use your desired currency
    });
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent", error);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
