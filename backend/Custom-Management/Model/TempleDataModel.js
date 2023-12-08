import mongoose, { Schema } from "mongoose";
const dataSchema = new mongoose.Schema({
    address: {
      type: String,
      required: true,
    },
    taxId: {
      type: String,
    },
    phone: {
      type: String,
    },
    fax: {
      type: String,
    },
    templeDescription: {
      type: String,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    facebookUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
},
    {timestamps:true}
  );
const TempleDetailsModel=mongoose.model("temple_details",dataSchema);
export {TempleDetailsModel};

  