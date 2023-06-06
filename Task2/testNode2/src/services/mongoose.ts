/** Mongoose Setup **/
import mongoose from "mongoose";





 export function StartMongooseServer ():void  {

const connectionParams:Object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  };

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL as string , connectionParams)
  .then(() => {
   console.log(">> MongoDB Online")
  })
    .catch((error) => console.log(`${error} did not connect`));
  
}
 
