const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact API route bridge
try {
  const contactHandler = require('./api/contact.js');
  app.all('/api/contact', (req, res) => contactHandler(req, res));
} catch (err) {
  console.error('Error loading api/contact handler:', err);
}

// Serve all static assets
app.use(express.static(path.join(__dirname)));

// Fallback all other routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
