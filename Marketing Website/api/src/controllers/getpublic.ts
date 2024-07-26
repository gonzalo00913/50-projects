import express, { Request, Response } from "express";
import PostModel from "../models/post";
import { CustomRequest } from "../utils/middleware";


const publicRouter = express.Router();

publicRouter.get("/", async (req: CustomRequest, res: Response) => {
    try {
     const posts = await PostModel.find({});
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  

export default publicRouter;