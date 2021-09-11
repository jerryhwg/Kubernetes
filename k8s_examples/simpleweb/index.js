// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init({
  logInjection: true
});

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('How are you doing');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
