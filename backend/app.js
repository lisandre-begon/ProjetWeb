const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/indexRoutes');
const http = require('http');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(cors({
  origin: function (origin, callback) {
    callback(null, true)
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require('./routes/indexRoutes');
const receipt = require('./routes/receiptRoutes');

app.get('/', (req, res) => res.send('Hello World!'));


app.use('/', indexRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`)
});
const server = http.createServer(app);

