import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRouter.js";
import cors from "cors";
import userRouter from "./route/userRouter.js";
import courseRouter from "./route/courseRouter.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.get("/", (req, res) => {
  res.send("Hello from server");
});

await connectDb(); //connect to the database first
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
