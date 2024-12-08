const express=require("express")
const app=express()
const cors=require("cors")
const morgan = require("morgan")
const connectDB = require("./database/db");
const authRoutes=require('./routes/authRoutes')
const testRoutes=require('./routes/testRoutes')
const productRoutes=require('./routes/productRoutes')
const isAuthenticated=require('./middleware/authMiddleware')
const port=4000;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
connectDB();
app.use('/auth',authRoutes)
app.use('/test',isAuthenticated,testRoutes)
app.use('/product',isAuthenticated,productRoutes)
console.log("hi")
app.listen(port,()=>{
    console.log("listening on port :",port);
})