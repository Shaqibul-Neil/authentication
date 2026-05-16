import express from "express";
import type {
  TApplication,
  TRequest,
  TResponse,
} from "./shared/types/express.types";
import appRouter from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandlers";

const app: TApplication = express();

//parsers
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use("/api", appRouter);

app.get("/", (req: TRequest, res: TResponse) => {
  res.send("Welcome to server");
});

// Global Error Handler
app.use(globalErrorHandler);

app.use((req: TRequest, res: TResponse) => {
  res.status(404).json({
    success: false,
    message: "API NOT FOUND!",
    errorSources: [{ path: req.originalUrl, message: "API Not Found" }],
  });
});

export default app;
