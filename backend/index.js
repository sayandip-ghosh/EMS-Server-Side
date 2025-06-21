import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import authRouter from './src/Routes/AuthRoutes.js';
import connectDB from './src/Models/db.js';
import projectRouter from './src/Routes/ProjectRoutes.js'; 
//import userRouter from './src/Routes/User.routes.js';
import memberRouter from './src/Routes/Member.routes.js';
import eventRouter from './src/Routes/Event.routes.js';
import domainRouter from './src/Routes/Domain.routes.js';
import attendanceRouter from './src/Routes/Attandance.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Add limit to handle large JSON (like base64 avatar)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
//app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
})
.catch((error) => {
    console.log('Connection failed', error);
});

// Routes
//app.use('/auth',memberRouter)
app.use('/api', projectRouter);
//app.use('/api/users', userRouter);
app.use('/api/members', memberRouter);
app.use('/api/events', eventRouter);
app.use('/api/domains', domainRouter);
app.use('/api/attendances', attendanceRouter);
