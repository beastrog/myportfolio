const express = require('express');
const app = express();
const port = 3002; // Different port to avoid conflicts

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ status: 'ok', message: 'Test server is running' });
});

// Contact form endpoint
app.post('/api/contact', express.json(), (req, res) => {
  console.log('Contact form submission:', req.body);
  res.json({ 
    success: true, 
    message: 'Message received successfully (test server)' 
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running on http://localhost:${port}`);
  console.log('Endpoints:');
  console.log(`  GET  http://localhost:${port}/api/health`);
  console.log(`  POST http://localhost:${port}/api/contact`);
  console.log('\nCORS is enabled for all origins');
});
