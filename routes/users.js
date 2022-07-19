import express from "express";
import { createUser, getUserByName } from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function genHashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  const hashedPassword = await genHashedPassword(password);

  const isUserExist = await getUserByName(username);

  if (isUserExist) {
    res.status(400).send({ message: "User already exists" });
  } else {
    await createUser({ username: username, password: hashedPassword }, res);
  }
});



router.post("/login", async function (req, res) {
  const { username, password } = req.body;

  const userFromDB = await getUserByName(username);
if(!userFromDB){
res.status(401).send({ message: 'Invalid credentials' });
}else{
  const storedDBPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password,storedDBPassword);
 
if(isPasswordMatch){
  const token= jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)
  res.send({ message: 'Successfully login',token:token });
}else{
  res.status(401).send({ message: 'Invalid credentials' })
}
}
});

export const usersRouter = router;
