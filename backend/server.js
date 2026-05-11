require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

require('./config/passport');

const app = express();

const PORT = process.env.PORT;

const MONGO_URI =process.env.CONNSTRING ;
//console.log(MONGO_URI);
//console.log("PORT:", process.env.PORT);

//Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(morgan('dev'));

app.use(passport.initialize());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/farms', require('./routes/farm'));

//Healthy route
app.get('/', (req, res) => {
  res.json({ 
    ok: true,
    message: 'API is healthy',
   });
});

//Start server and connect to MongoDB
async function start() {
 
  try {
    await mongoose.connect(MONGO_URI);

    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
  });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // inspect logs; uncomment process.exit(1) when ready
    // process.exit(1);
  }
}


start();