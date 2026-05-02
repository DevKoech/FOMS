const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
 const PORT = process.env.PORT;
 const MONGO_URI =process.env.CONNSTRING ;

console.log("PORT:", process.env.PORT);
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// mount your backend route files (ensure these paths exist)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/farms', require('./routes/farm'));

// basic health route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Farm advisor API running' });
});

async function start() {
 
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // do not exit immediately so you can inspect logs; uncomment process.exit(1) when ready
    // process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();