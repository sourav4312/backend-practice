import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.use(cookieParser());


// import router
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import commentRouter from "./routes/comment.routes.js"


// user router


app.use("/api/v1/users", userRouter);
app.use("/api/v1", postRouter)
app.use("/api/v1", commentRouter)

export default app;