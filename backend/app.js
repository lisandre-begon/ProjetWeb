const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRouter = require('./routes/userRoutes');
app.use(express.static('../frontend'));


var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


app.use('/user', userRouter);
app.use(cors(corsOptions));
app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req, res) => {
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});