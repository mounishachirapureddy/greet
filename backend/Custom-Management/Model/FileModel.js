import mongoose,{Schema} from "mongoose";
const FileData=new mongoose.Schema({
    filename:String,
    originalname:String,
    path:String,
    mimetype:String,
    data:{
        type:Buffer
    },

    }


);
const FileDataModel=mongoose.model('temple_files',FileData)
export {FileDataModel}