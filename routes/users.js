import express from "express";
import {
  getAllDress,
  getDressById,
  createDress,
  deleteDressById,
  updateDressById,
} from "./helper.js";
import bcrypt from "bcrypt";
const router = express.Router();

async function genHashedPassword(password) {
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
    }


router.post("/signup", async function (req, res) {
  const {username, password} = req.body;
  const hashedPassword=await genHashedPassword(password);
  res.send(hashedPassword);
});



export const usersRouter = router;
