const express=require("express")
const cron = require('cron');
const app=express()
const cors=require("cors")
const morgan = require("morgan")
const connectDB = require("./database/db");
const authRoutes=require('./routes/authRoutes')
const testRoutes=require('./routes/testRoutes')
const productRoutes=require('./routes/productRoutes')
const updateProducts=require('./crons/priceChecker')
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
    // Schedule the cron job
const job = new cron.CronJob('0 * * * *', updateProducts);
job.start();
app.listen(port,()=>{
    console.log("listening on port :",port);
})