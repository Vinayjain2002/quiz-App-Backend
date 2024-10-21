import express from "express"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors())

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
