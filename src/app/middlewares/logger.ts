import fs from "fs";
import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../../shared/types/express.types";

const logger = (req: TRequest, res: TResponse, next: TNextFunction) => {
  console.log("Time:", req.method, req.url, Date.now());
  const log = `Method :  ${req.method} -> Time : ${Date.now()} -> URL ${req.url}`;
  fs.appendFile("logger.txt", log + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};
export default logger;
