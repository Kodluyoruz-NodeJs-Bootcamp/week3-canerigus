import dotenv from "dotenv"
if (process.env.NODE_ENV !== 'production') {dotenv.config()}
import session from 'express-session';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import path from 'path';
//import Routes
import Routes from './src/routes/routes'
//view handler & 404 routes
import { handleViews, NotFound } from "./src/controller/routes";
//error handler for app
import { errorHandler } from "./src/utils/ErrorHandler";
//cookie options
import {sessionOptions} from "./src/config/session"
  
//Database connections with mongoose and error handling
mongoose.connect(process.env.MONGO_DB_URL)
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', () => { console.log('Database connected!') });

//app options
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), './client/views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), './client/public')));
app.use(session(sessionOptions));
app.use(flash())

//renders flash success&error&navbar. uses res.locals properties. 
app.use(handleViews)
//routes for /register & /login & /users and generic /home & /logout
console.log(Routes.stack)
app.use('/', Routes)
//invalid route handler next'ed into error handler below to be catched, so that we can display the error.
app.all('*', NotFound)
app.use(errorHandler);

app.listen(process.env.PORT|| 3535, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});