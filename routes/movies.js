import express from "express";
import { GetmovieById, FilterMovie, CreateMovie, UpdateMovieById, DeleteMovieById,Getmovies } from "../helper.js";
import { auth } from "../middleware/auth.js";

// replacing app to router //
const router=express.Router()


// To filter Movie By Rating using get method /
router
.route("/")
.get(async(request,response)=>{
    const filter=request.query;
    console.log(filter);
    if(filter.rating){
        filter.rating=parseInt(filter.rating)
    }
    const filterrating=await FilterMovie(filter);
    response.send(filterrating);
    console.log(filterrating)
})
.get(async(request,response)=>{
    const data=await Getmovies()
    response.send(data);
})
.post(async(request,response)=>{
    const data=request.body;
    const movie=await CreateMovie(data)
    response.send(movie)
   
})// Adding movies using POST Method //

// To get movies by id using get method //
router
.route("/:id")
.get(auth,async(request,response)=>{
    const {id}=request.params;
    const result=await GetmovieById(id)
    response.send(result);
    console.log(result);
})
.put(async(request,response)=>{
    const { id }=request.params;
    const data=request.body;
    const result=await UpdateMovieById(id, data);
    const movie= await GetmovieById(id)
    response.send(movie);
   })//Edit movies using PUT Method//

.delete(async(request,response)=>{
    const{id}=request.params;
    const result=await DeleteMovieById(id)
    result.deletedCount > 0
    ? response.send(result)
    : response.status(404).send({message:"No matching movie found"})
   
})// Deleteing movies using DELETE Method //

export const MoviesRouter=router;