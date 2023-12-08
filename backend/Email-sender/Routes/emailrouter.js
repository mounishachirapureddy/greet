import { getConnection } from "../config/db.js";
import express,{json} from 'express'
import { sendBirthdayGreetings } from "../Controller/EmailController.js";
const email_router=express.Router()
email_router.post('/emailnotification',sendBirthdayGreetings)
export{email_router}
