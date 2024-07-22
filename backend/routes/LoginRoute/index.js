import { Router } from "express";
const loggingRoutes = Router();
import { login, logout } from "../../controllers/loggingControlers/index.js";

// Importing logging controllers
// http://locatlhost:8000/api/v1/auth/login
loggingRoutes.post("/login", login);

// http://locatlhost:8000/api/v1/auth/logout
loggingRoutes.post("/logout", logout);

export default loggingRoutes;
