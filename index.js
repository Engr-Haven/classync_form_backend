const express = require("express");

require("dotenv").config();

// imports routes >>>
const userRoutes = require("./src/route/userRoute");

const app = express();

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

app.listen(process.env.PORT, () => {
  console.log(
    `Class Sync server is running on http://localhost:${process.env.PORT}`,
  );
});
