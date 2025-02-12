const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const connectDB = require("./db"); // Import MongoDB connection function

// Import Routes
const { authSocket, socketServer } = require("./socketServer");
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");

dotenv.config(); // Load environment variables

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://royalcomplains.onrender.com"],
  },
});

// WebSockets
io.use(authSocket);
io.on("connection", (socket) => {
  console.log("🔗 New WebSocket Connection");
  socketServer(socket);
});

// Connect to MongoDB Atlas
connectDB(); // ✅ Call the database connection function

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins

// API Routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);

console.log("✅ API Routes Loaded Successfully"); // Debugging Route Issues

// Root Route (Check if Backend is Running)
app.get("/", (req, res) => {
  res.send("✅ Royal Complains API is Live!");
});

// Start Server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});
