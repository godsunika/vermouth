import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import userRoutes from "./app/routes/user.routes.js";
import authRoutes from "./app/routes/auth.routes.js";

dotenv.config();
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name    : "bezkoder-session",
    secret  : "COOKIE_SECRET",      // should use as secret environment variable
    httpOnly: true
  })
);

authRoutes(app);
userRoutes(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});