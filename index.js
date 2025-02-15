const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");
const { Console } = require('console');
const Product = require("./schema.js");
require('dotenv').config();


const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

const uri = process.env.MOGODB_URI
mongoose.connect(uri)
.then(() => {console.log("Connected to the server")})
.catch((err) => {console.error("Failed to connect", err)})


app.post("/menu",async (req,res)=>{
  try{
    const newproduct = new Product(req.body);
    const savedProduct =await newproduct.save();
    res.status(200).json({message:"Successfully Added",savedProduct});
  }catch(error){
    res.status(500).json({error:"Inernal server Error"})
  }
})

app.get('/menu',async(req, res) => {
  try{
    const data =await Product.find();
    if(data.length === 0){
      res.status(404).json({message:"Product not found!"})
    }
    res.status(200).json(data);
  }catch(error){
    res.status(500).json({error:"Inernal server Error"})
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// {
//   "name":"ASUS",
//   "description":"ASUS TUF series i7 13th Gen H processer 240W",
//   "price":1130000
// }