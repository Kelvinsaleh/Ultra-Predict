require("dotenv").config(); // Load environment variables

const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// PayPal Credentials
const PAYPAL_WEBHOOK_SECRET = process.env.PAYPAL_WEBHOOK_SECRET;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// Webhook Handler Route
app.post("/paypal-webhook", (req, res) => {
    const body = JSON.stringify(req.body);
    const headers = req.headers;
    const signature = headers["paypal-transmission-sig"];
    const transmissionId = headers["paypal-transmission-id"];
    const transmissionTime = headers["paypal-transmission-time"];
    const certUrl = headers["paypal-cert-url"];
    const algorithm = headers["paypal-auth-algo"];

    // Verify PayPal Webhook Signature
    const expectedSignature = crypto.createHmac("sha256", PAYPAL_WEBHOOK_SECRET)
        .update(transmissionId + transmissionTime + body)
        .digest("base64");

    if (signature !== expectedSignature) {
        return res.status(400).send("Invalid PayPal Webhook Signature");
    }

    // Process Event
    const event = req.body;
    console.log("Received PayPal Webhook Event:", event.event_type);

    switch (event.event_type) {
        case "BILLING.SUBSCRIPTION.ACTIVATED":
            console.log("Subscription Activated:", event.resource.id);
            // Grant VIP access to user in your database
            break;

        case "BILLING.SUBSCRIPTION.CANCELLED":
            console.log("Subscription Cancelled:", event.resource.id);
            // Revoke VIP access
            break;

        case "BILLING.SUBSCRIPTION.EXPIRED":
            console.log("Subscription Expired:", event.resource.id);
            // Revoke VIP access
            break;

        default:
            console.log("Unhandled Event:", event.event_type);
    }

    res.status(200).send("Webhook Processed");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
