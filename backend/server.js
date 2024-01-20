import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

// import all routes
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect DB
connectDB();

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT:${PORT}`.bgBlue
      .black.underline.bold
  );
});
