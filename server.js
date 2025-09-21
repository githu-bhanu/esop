const express = require('express');
const path = require('path');

const app = express();

// Serve static files from dist/esop
app.use(express.static(path.join(__dirname, 'dist/esop')));

// Catch all other routes and return index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/esop/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
