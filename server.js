require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

app.use (express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(cors());

const loginLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3,
  delayMs: 0, // disables
  message: 'Maximum login attempts exceeded!'
});

const signupLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  delayMs: 0, //disabled
  message: "Maximum accounts created. Please try again later."
})

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});

app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'))
app.use('/locked', 
        expressJWT({secret: process.env.JWT_SECRET}).unless({method: 'POST'}), 
        require('./routes/locked'));
        
app.use('/api', require('./routes/api'));

// call the Personanality Insights API
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

const personalityInsights = new PersonalityInsightsV3({
  version: '2017-10-13',
  iam_apikey: process.env.IAM_APIKEY,
  url: process.env.URL
});

app.listen(process.env.PORT, () => {
  console.log(`You're listening to the sweet sounds of port ${process.env.PORT} in the morning`)
});