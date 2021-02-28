const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IMfb5HG3kJ0ukLcQgACupw1c2shRSKhKvekclYi72Ddcj9KyXiVhkxtW0L3EtdyFPOIsxTdaKALxcT8T3GVpdlO00hSgztiq0");


// API

// APP config

const app = express();

// Middlewares

app.use(cors({origin: true}));
app.use(express.json()); // Will allow us to send and get json data


// API Routes

app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request,response) => {
    const total = request.query.total; // Amount in Sub unit

    console.log("Payment Request Recieved BOOOM for this amount >>>",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // in subunit of the currency
        currency: "usd", //Change country code
    });

    // Ok - Created

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

})
// Listen command
exports.api = functions.https.onRequest(app);


// Example endpoint

// http://localhost:5001/challenge-fe8f5/us-central1/api