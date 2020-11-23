'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');

const getDefault = (req, res) => res.status(404).send('URL not found');

const { getRandomImage, getImageList, getImage } = require('./controllers/background');

const app = express();
app.use('/background/random', getRandomImage);
app.use('/background/group/:filter/:count?', getImageList);
app.use('/background/:id', getImage);
app.use(getDefault);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8887;
  const server = app.listen(port, () => console.log(`listening on port ${port}`));
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 70000;
  server.on('error', (e) => {
      console.error('Unable to start server:', e.message || e);
  });
}
exports.generate = app;
