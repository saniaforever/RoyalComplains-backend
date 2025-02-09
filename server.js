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
    origin: ["http://localhost:3000", "https://post-it-heroku.herokuapp.com"],
  },
});

// WebSockets
io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

// Connect to MongoDB Atlas
connectDB(); // ✅ Call the database connection function

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Start Server
httpServer.listen(process.env.PORT || 4000, () => {
  console.log("🚀 Server Running on Port", process.env.PORT || 4000);
});
