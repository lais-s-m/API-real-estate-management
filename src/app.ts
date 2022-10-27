import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/user.routes";
import sessionRouter from "./routes/sessions.routes";
import handleErrorMiddleware from "./middlewares/handleError.mddileware";
import categoryRoutes from "./routes/categories.routes";
import propertyRoutes from "./routes/properties.routes";
import scheduleRoutes from "./routes/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRouter);
app.use("/categories", categoryRoutes);
app.use("/properties", propertyRoutes);
app.use("/schedules", scheduleRoutes);

app.use(handleErrorMiddleware);

export default app;
