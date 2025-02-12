const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/auth");

// ✅ Signup & Login Routes
router.post("/signup", userControllers.register); // Changed from "/register"
router.post("/login", userControllers.login);

// ✅ Fetch Random Users
router.get("/random", userControllers.getRandomUsers);

// ✅ Follow / Unfollow Users
router.post("/follow/:id", verifyToken, userControllers.follow);
router.delete("/unfollow/:id", verifyToken, userControllers.unfollow);

// ✅ Fetch Followers & Following
router.get("/followers/:id", userControllers.getFollowers);
router.get("/following/:id", userControllers.getFollowing);

// ✅ Fetch & Update User (Ensure `/:username` doesn't interfere with `/:id`)
router.get("/profile/:username", userControllers.getUser); // Changed route
router.patch("/update/:id", verifyToken, userControllers.updateUser); // Changed route

module.exports = router;
