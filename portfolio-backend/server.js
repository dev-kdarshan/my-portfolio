require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

let db;
let formResponsesCollection;

// Connect to MongoDB
MongoClient.connect(uri)
  .then(client => {
    db = client.db("portfolioDB"); // your DB name
    formResponsesCollection = db.collection("formResponses"); // your collection name
    console.log(" Connected to MongoDB (Local)");
  })
  .catch(error => {
    console.error(" MongoDB connection error:", error);
  });

// POST endpoint to receive form data
app.post("/submit", async (req, res) => {
  const { name, detail, email } = req.body;

  try {
    const result = await formResponsesCollection.insertOne({ name, detail, email, createdAt: new Date() });
    res.status(200).json({ message: "Form submitted successfully!", id: result.insertedId });
  } catch (error) {
    console.error(" Error inserting data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// GET route to see submissions
app.get("/submissions", async (req, res) => {
  try {
    const data = await formResponsesCollection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
