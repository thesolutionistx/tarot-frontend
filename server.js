const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname), {
  maxAge: '1y',
  etag: true
}));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 