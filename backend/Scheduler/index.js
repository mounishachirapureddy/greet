import express,{json} from 'express';
import { scheduleroute } from './Route/scheduleroute.js';
import { getConnection } from './config/db.js';

const app = express();
app.use(express.json());



//const upload = multer({ dest: 'uploads/' });
//const upload1 = multer({dest: 'temple_files1/'});
/*
try{
    const client=await  getConnection();
    const db=client.db('templedb');
    console.log("Connected to Data base setup")

}
catch(error){
    console.log("connection failed",error)
}*/
const PORT = 3008;
app.listen(PORT, () => {
  getConnection();
  console.log(`Server running on port ${PORT}`);
});
app.use('/api',scheduleroute);
//app.use('/api',VideoInfo)


