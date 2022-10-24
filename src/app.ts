import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/user.routes";
import sessionRouter from "./routes/sessions.routes";
import handleErrorMiddleware from "./middlewares/handleError.mddileware";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRouter);

app.use(handleErrorMiddleware);

export default app;
