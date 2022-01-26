import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { MoviesRouter } from "./routes/movies.js";
import { UserRouter } from "./routes/users.js";
import cors from "cors";

dotenv.config(); //dotenv configiration//

const app = express();

const PORT = process.env.PORT; //PORT Number//

app.use(cors()); //third party middleware used to access data//

app.use(express.json()); //middleware to convert data into json format//

const MONGO_URL = process.env.MONGO_URL; //MongoDb URL//

//MongoDb connection//
async function Connection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb connected");
  return client;
}

export const client = await Connection();

// server welcome page //
app.get("/", (request, response) => {
  response.send("Hello World");
});

app.use("/movies", MoviesRouter);
app.use("/users", UserRouter);

app.listen(PORT, () => console.log("APP running in PORT", PORT));
