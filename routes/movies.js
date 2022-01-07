import express from "express";
import { GetmovieById, FilterMovie, CreateMovie, UpdateMovieById, DeleteMovieById } from "../helper.js";

// replacing app to router //
const router=express.Router()



// To filter Movie By Rating using get method //
router.get("/",async(request,response)=>{
    const filter=request.query;
    console.log(filter);
    if(filter.rating){
        filter.rating=parseInt(filter.rating)
    }
    const filterrating=await FilterMovie(filter);
    response.send(filterrating);
    console.log(filterrating)
})

// Adding movies using POST Method //
router.post("/",async(request,response)=>{
    const data=request.body;
    const movie=await CreateMovie(data)
    response.send(movie)
   
})

// To get movies by id using get method //
router.get("/:id",async(request,response)=>{
    const {id}=request.params;
    const result=await GetmovieById(id)
    response.send(result);
    console.log(result);
})

//Updating movies using PUT Method//
router.put("/:id",async(request,response)=>{
    const {id}=request.params;
    const data=request.body;
    const result=await UpdateMovieById(id, data);
    response.send(result)
   
})

// Deleteing movies using DELETE Method //
router.delete("/:id",async(request,response)=>{
    const{id}=request.params;
    const result=await DeleteMovieById(id)
    result.deletedCount > 0
    ? response.send(result)
    : response.status(404).send({message:"No matching movie found"})
   
})

export const MoviesRouter=router;