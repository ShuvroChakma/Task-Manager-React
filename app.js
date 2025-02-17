import cors from "cors"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import {DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE} from "./app/configs/config.js"
import express from "express";
import router from "./routes/api.js";




const app = express();

// App Use Default Middleware
app.use(cors());
app.use(express.json({MAX_JSON_SIZE}));
app.use(express.urlencoded(URL_ENCODE));
app.use(helmet());


// App Use Limiter

const limiter = rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter);


// Cache
app.set('etag',WEB_CACHE)


// Database Connect
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("Database Connected!");
}).catch(()=>{
    console.log("Database disconnected");
})
 
app.use("/api",router)

app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT)
})