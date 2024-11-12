import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './Routes/AuthRoutes.js';
import connectDB from './Models/db.js';
import projectRouter from './Controllers/ProjectController.js'; 


const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
connectDB()
.then(()=>{
    app.listen(PORT , ()=>{
        console.log('Server is running on port ', PORT);
        
    })
})
.catch((error)=>{
    console.log('Connection failed',error);
})

app.use('/auth',authRouter)
app.use('/api', projectRouter);

