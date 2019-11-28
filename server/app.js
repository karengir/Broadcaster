/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
import recordRouter from "./routes/recordRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/red-flags", recordRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Broadcaster project"
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
