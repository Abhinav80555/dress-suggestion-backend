import express from "express";
import { MongoClient } from "mongodb";
const app = express()
import dotenv from "dotenv";
dotenv.config();

const PORT=process.env.PORT;



app.use(express.json());

const MONGO_URL=process.env.MONGO_URL;

async function createConnection(){
    const client= new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb is connected");
    return client;
}
//top level await -es6
const client= await createConnection();

app.get('/', function (req, res) {
  res.send('Hello World')
});  

app.get('/dress',async function (req, res) {
  //db.dress.findOne({})
  const result= await client.db("dress").collection("dress").find({}).toArray();
    res.send(result)
  });

app.get('/dress/:id',async function (req, res) {
    const {id}= req.params;
    //db.dress.findOne({id:id})
    const result =await client.db("dress").collection("dress").findOne({id:id})
    result? res.send(result):res.status(404).send({error : 'not found'});
  });

  app.post('/dress',async function (req, res) {
    const data = req.body;
    //db.dress.insertMany(data)
const result = await client.db("dress").collection("dress").insertMany(data);
res.send(result);
  });



  app.delete('/dress/:id',async function (req, res) {
    const {id}= req.params;
    //db.dress.deleteOne({id:id})
    const result =await client.db("dress").collection("dress").deleteOne({id:id})
    result.deletedCount>0 ? res.send(result):res.status(404).send({error : 'not found'});
  });



  app.put('/dress/:id',async function (req, res) {
    const data = req.body;
    const {id}= req.params;
    //db.dress.updatetOne({id:id},{$set:data})
const result = await client.db("dress").collection("dress").updateOne({id:id},{$set:data});
res.send(result);
  });

app.listen(PORT,()=>console.log(`App listening on ${PORT}`));