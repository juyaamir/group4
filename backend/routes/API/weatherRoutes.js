import { getWeather } from "../../controllers/API/weatherController.js";
import { Router } from "express";

const weatherRouter = Router();

weatherRouter.get("/", getWeather);

export default weatherRouter;