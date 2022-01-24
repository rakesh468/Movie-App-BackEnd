import { client } from "./index.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

async function DeleteMovieById(id) {
  return await client
    .db("movieapp")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
async function UpdateMovieById(id, data) {
  return await client
    .db("movieapp")
    .collection("movie")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
async function CreateMovie(data) {
  return await client.db("movieapp").collection("movies").insertMany(data);
}
async function FilterMovie(filter) {
  return await client
    .db("movieapp")
    .collection("movies")
    .find(filter)
    .toArray();
}
async function GetmovieById(id) {
  return await client
    .db("movieapp")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
async function CreateUser(data) {
  return await client.db("movieapp").collection("users").insertOne(data);
}
async function Getuserbyname(email) {
  return await client
    .db("movieapp")
    .collection("users")
    .findOne({ email: email });
}

async function genpassword(password) {
  const no_of_round = 10;
  const salt = await bcrypt.genSalt(no_of_round);
  console.log(salt);
  const hashedpassword = await bcrypt.hash(password, salt);
  console.log(hashedpassword);
  return hashedpassword;
}

export {
  GetmovieById,
  FilterMovie,
  CreateMovie,
  UpdateMovieById,
  DeleteMovieById,
  genpassword,
  CreateUser,
  Getuserbyname,
};
