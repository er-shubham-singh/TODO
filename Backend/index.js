// import express from "express";
// import mongoose from "mongoose";
// import cors from 'cors'
// import { mainRouter } from "./routes/authRoute.js";
// import taskRoute from "./routes/taskRoute.js";
// import dotenv from 'dotenv';
// dotenv.config();
// const port=process.env.port
// const app = express();
// app.use(cors())
// app.use(express.json());
// app.use(mainRouter)
// app.use(taskRoute)


// mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
// .then(()=>{
// app.listen(port,()=>{
//   console.log("mongodb connected")
// })
// })


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import { mainRouter } from "./routes/authRoute.js";
// import taskRoute from "./routes/taskRoute.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT||1000;

// app.use(cors());

// app.use(express.json());

// app.use(mainRouter);
// app.use(taskRoute);

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   app.listen(port, () => {
//     console.log(`MongoDB connected & server running on port ${port}`);
//   });
// })
// .catch((err) => {
//   console.error("MongoDB connection error:", err);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { mainRouter } from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 1000;

// Configure CORS to allow all origins and handle preflight requests
app.use(cors({
  origin: "*",                      // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow common methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow common headers
  credentials: true,                // Allow credentials (cookies, auth headers)
}));



// Use JSON middleware to parse request bodies
app.use(express.json());

// Set up your routes
app.use(mainRouter);
app.use(taskRoute);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(port, () => {
      console.log(`MongoDB connected & server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
