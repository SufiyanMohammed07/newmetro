import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; // ✅ add this
const router = express.Router();
dotenv.config();
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ msg: "Phone number is required" });

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: `+91${phone}`, channel: "sms" });

    res.status(200).json({ msg: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ msg: "Failed to send OTP", error: err.message });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code)
      return res.status(400).json({ msg: "Phone and OTP are required" });

    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: `+91${phone}`, code });

    if (verification_check.status === "approved") {
       const token = jwt.sign({ phone, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.status(200).json({ msg: "OTP verified successfully", token });
    } else {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ msg: "Verification failed", error: err.message });
  }
});

export default router;
