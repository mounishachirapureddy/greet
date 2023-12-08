import express,{json} from 'express';
import { RetriveBirdthdate } from '../controller/RetriveController.js';
const Retrive=express.Router()
Retrive.get('/getBirthdate',RetriveBirdthdate)
export {Retrive}