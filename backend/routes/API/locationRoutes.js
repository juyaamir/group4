import { getLocation } from "../../controllers/API/locationController.js";
import {Router } from "express";

const locationRouter = Router();
locationRouter.route('/').get(getLocation);

export default locationRouter;