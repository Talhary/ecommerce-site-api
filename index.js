import express from 'express';
import 'dotenv/config';
import Connect from './db/mongo.js';
import 'express-async-errors';
import './middlware/auth.js';
import passport from 'passport';
import session from './utils/sesson.js';
import './middlware/auth.js'; 
import authRoute from './routes/authRoute.js'
import cors from './utils/cors.js'
import winston from'winston';
 import expressWinston from'express-winston';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors);
app.use(express.json());
app.use(express.static('./public'));

// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console()
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json()
//   ),
//   meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//   msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//   colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//   ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
// }));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoute)

app.use((err, req, res, next) => {
  console.error(err); // Use console.error for errors
  res.status(500).json({ message: 'An internal server error occurred' });
});
const start = async () => {
  try {
    app.listen(port);
    await Connect();
    console.log('connected to Database');
  } catch (error) {
    console.error(error);
  }
};
start();
