<<<<<<< HEAD
import { Router } from "express";
import { createChat } from "../controllers/Chats.js";
=======
import { Router } from 'express';
import { createChat } from '../controllers/Chats.js'
>>>>>>> 5804a2b1958d3ad1e4fd49456bd9b5fdfc664479

const chatRouter = Router();

chatRouter.post("/", createChat);

export default chatRouter;
