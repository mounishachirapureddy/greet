import express,{json} from 'express';
import { getConnection } from './config/db.js';
import { email_router } from './Routes/emailrouter.js';
const app=express()
app.use(express.json())
try{
    const client=await  getConnection();
    const db=client.db('templedb');
    console.log("Connected to Data base setup")

}
catch(error){
    console.log("connection failed",error)
}
const PORT = 3006;
app.listen(PORT, () => {
  getConnection();
  console.log(`Server running on port ${PORT}`);
});
app.use('/api',email_router)

