import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { dbConnect } from './database/dbConfig.js'
import userRouter from './routes/userRoute.js'
import farmerRouter from './routes/farmerRoute.js'
import adminRouter from './routes/adminRoute.js'

const app = express();
config({ path: './config/config.env' });

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/farmer', farmerRouter);
app.use('/api/v1/admin', adminRouter);

dbConnect();

export default app;