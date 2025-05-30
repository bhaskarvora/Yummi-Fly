import express from "express"
import cors from "cors"

import { connectDB } from './config/db.js';
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";





// App Config

const app = express()
const port =4000

// Middleware
// Using the below any request from frontend to backend will be parsed using the json 
app.use(express.json())
app.use(cors())


// db connection

connectDB();



// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter)


app.get("/",(req,res) =>{
    res.send("API Working")
})

app.listen(port,() =>{
    console.log(`Server started on http://localhost:${port}`)
})
