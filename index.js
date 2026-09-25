const express = require("express");
const cors = require("cors");

require("dotenv").config();

// imports routes >>>
const userRoutes = require("./src/route/userRoute");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Routes here >>>
app.use("/users", userRoutes);

// API Root Endpoint >>>
app.get("/class-sync", (req, res) => {
  res.status(200).json({
    message: "Class Sync API to get Students email is live",
    version: "1.0.0",
  });
});

const myPORT = process.env.PORT || 5000;

app.listen(myPORT, "0.0.0.0", () => {
  console.log(
    `Class Sync server is running on http://localhost:${process.env.PORT}`,
  );
});
