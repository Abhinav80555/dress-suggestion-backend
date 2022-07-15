import express from "express";
import {client} from "../index.js";

const router=express.Router();

router.get('/',async function (req, res) {
    //db.dress.findOne({})
    const result= await client.db("dress").collection("dress").find({}).toArray();
      res.send(result)
    });
  
  router.get('/:id',async function (req, res) {
      const {id}= req.params;
      //db.dress.findOne({id:id})
      const result =await client.db("dress").collection("dress").findOne({id:id})
      result? res.send(result):res.status(404).send({error : 'not found'});
    });
  
    router.post('/',async function (req, res) {
      const data = req.body;
      //db.dress.insertMany(data)
  const result = await client.db("dress").collection("dress").insertMany(data);
  res.send(result);
    });
  
  
  
    router.delete('/:id',async function (req, res) {
      const {id}= req.params;
      //db.dress.deleteOne({id:id})
      const result =await client.db("dress").collection("dress").deleteOne({id:id})
      result.deletedCount>0 ? res.send(result):res.status(404).send({error : 'not found'});
    });
  
  
  
    router.put('/:id',async function (req, res) {
      const data = req.body;
      const {id}= req.params;
      //db.dress.updatetOne({id:id},{$set:data})
  const result = await client.db("dress").collection("dress").updateOne({id:id},{$set:data});
  res.send(result);
    });

    export const dressRouter=router;