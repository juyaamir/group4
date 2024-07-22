import { Router } from "express";
import {
  getAllorders,
  getSingleorder,
  createSinglorder,
  updateSingleorder,
  deleteSingleorder,
} from "../controllers/OrderController.js";

const orderrouter = Router();

orderrouter.get("/", getAllorders).post("/", createSinglorder);

/* orderrouter.post("/", createSingleUser); */

orderrouter
  .get("/:id", getSingleorder)
  .put("/:id", updateSingleorder)
  .delete("/:id", deleteSingleorder);

/* orderrouter.put("/:id", updateSingleUser);
orderrouter.delete("/:id", deleteSingleUser); */

export default orderrouter;
