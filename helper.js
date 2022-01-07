import { client } from "./index.js";

 async function DeleteMovieById(id) {
    return await client.db("movieapp").collection("movies").deleteOne({ id: id });
}
 async function UpdateMovieById(id, data) {
    return await client.db("movieapp").collection("movie").updateOne({ id: id }, { $set: data });
}
 async function CreateMovie(data) {
    return await client.db("movieapp").collection("movies").insertMany(data);
}
 async function FilterMovie(filter) {
    return await client.db("movieapp").collection("movies").find(filter).toArray();
}
 async function GetmovieById(id) {
    return await client.db("movieapp").collection("movies").findOne({ id: id });
}

export  { GetmovieById, FilterMovie, CreateMovie, UpdateMovieById, DeleteMovieById }