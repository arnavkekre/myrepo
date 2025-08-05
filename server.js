const express = require('express');
const path = require('path');
const axios = require('axios'); // or use axios instead
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fetch', async (req, res) => {
  try {
    const targetUrl = 'https://example.com';
    const response = await axios.get(targetUrl);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(`Error fetching the page: ${error.message}`);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
