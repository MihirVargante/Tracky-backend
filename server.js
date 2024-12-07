const express=require("express")
const app=express()
const cors=require("cors")
const morgan = require("morgan")
const connectDB = require("./database/db");
const authRoutes=require('./routes/authRoutes')
const port=4000;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
connectDB();
app.use('/auth',authRoutes)
console.log("hi")
app.listen(port,()=>{
    console.log("listening on port :",port);
})