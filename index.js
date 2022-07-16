import express from "express";
import { MongoClient } from "mongodb";
const app = express();
import dotenv from "dotenv";

import { dressRouter } from "./routes/dress.js";
import { usersRouter } from "./routes/users.js";
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected");
  return client;
}
//top level await -es6
export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/dress", dressRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`App listening on ${PORT}`));


