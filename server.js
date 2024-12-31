const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// POST Route to Handle Form Submission
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate form data
    if (!name || !email || !message) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {
        // Create a transporter (Use your email credentials here)
        const transporter = nodemailer.createTransport({
            service: "gmail", // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: "poonam.pc1112@gmail.com", // Replace with your email
                pass: "hrad roxl xeei niir",  // Replace with your email password
            },
        });

        // Email options
        const mailOptions = {
            from: email,
            to: "poonam.pc1112@gmail.com", // Replace with your email
            subject: `Portfolio Contact Form - Message from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to send the message." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});