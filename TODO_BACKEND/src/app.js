import express from "express";
import router from "./route/todo.route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/todo", router);

export default app;