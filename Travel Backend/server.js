// ================================================
// FINAL STABLE VERSION - AI Agent Should Work Now
// ================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// GEMINI SETUP
// ======================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash"     // ← Most stable & fast model right now
});

// Middleware
app.use(cors());
app.use(express.json());

// ======================
// AI CHAT ROUTE
// ======================
app.post('/api/ai/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("🤖 User:", message);

  try {
    const prompt = `You are NomadAI - a friendly, energetic Indian travel agent.
Speak naturally and excitedly. Use ₹ for prices. Give structured answers when possible.

Previous chat: ${history.slice(-6).map(h => `${h.role}: ${h.content}`).join('\n')}

User: ${message}

Reply helpfully and engagingly:`;

    const result = await model.generateContent(prompt);
    const aiReply = result.response.text();

    res.json({ reply: aiReply || "Sure! Tell me more about your trip plans." });

  } catch (error) {
    console.error("Gemini Error:", error.message);
    
    // Strong Fallback - So user always gets something
    res.json({ 
      reply: `Got it! You want help with: "${message}"\n\n` +
             `I'm creating a personalized travel plan for you.\n\n` +
             `Please tell me:\n` +
             `• Your budget (in ₹)\n` +
             `• When you want to travel\n` +
             `• Number of people\n\n` +
             `I'll make a full day-by-day itinerary! ✈️`
    });
  }
});
// ======================
// MODELS (Add this block)
// ======================
const tripSchema = new mongoose.Schema({
  destination: String,
  budget: Number,
  startDate: Date,
  people: Number,
  itinerary: String,
  createdAt: { type: Date, default: Date.now }
});
const Trip = mongoose.model('Trip', tripSchema);

const bookingSchema = new mongoose.Schema({
  destination: String,
  date: Date,
  type: String,           // flight, hotel, package
  status: { type: String, default: "confirmed" },
  price: Number,
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// ======================
// Basic Routes
// ======================
app.get('/', (req, res) => {
  res.json({ message: "✅ NomadAI Backend is Running! AI Agent Ready." });
});

app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", model: "gemini-2.5-flash" });
});
// ======================
// BOOKINGS & TRIPS ROUTES (NEW)
// ======================
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking created!", booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/trips', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/trips', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json({ message: "Trip saved!", trip: newTrip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Start Server
// ======================
// Start Server + MongoDB
// ======================
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 AI Agent is ready - Try sending a message now!`);
  
  // Connect to MongoDB Atlas
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Atlas Connected Successfully!');
    } else {
      console.log('⚠️  MONGO_URI not found in .env');
    }
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
  }
});