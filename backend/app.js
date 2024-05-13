const express = require('express');
const app = express();
const port = 3000;

const userRouter = require('./routes/User');
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});