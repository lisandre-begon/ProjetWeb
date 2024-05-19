const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const indexController = require('./controllers/indexControllers');

const app = express();
const port = 5000;

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

app.post('/login', indexController.login);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});