import express ,{json} from "express";
import { scheduler } from "../controller/scheduler.js";
const scheduleroute=express.Router()
scheduleroute.post('/schedule',scheduler)
export{scheduleroute}