import express from "express";
import {createComment, getPostComments, deleteComment} from "../controllers/comment.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = express.Router();


router.post("/post/:postId/comments", verifyJWT, createComment);

router.get("/post/:postId/comments", getPostComments);

router.delete("/comments/:commentId", verifyJWT, deleteComment);

export default router;