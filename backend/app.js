const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // this is the origin of your frontend
  methods: ['GET', 'POST'], // the HTTP methods you want to allow
  credentials: true, // this allows session cookies to be sent with requests
  optionsSuccessStatus: 200 // some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json()); // This is needed to parse JSON request bodies

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});