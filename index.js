const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); // Load environment variables
const { connectToDatabase } = require("./config/dbConfig");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  try {
    const db = await connectToDatabase();
    console.log(db)
    console.log("Connected to MongoDB");
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
});
