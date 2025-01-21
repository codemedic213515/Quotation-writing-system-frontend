// Import required modules using ES module syntax

import express from 'express';

import path from 'path';

import { fileURLToPath } from 'url';

// Create an instance of the Express app

const app = express();

const port = process.env.PORT || 5173;

// Get the directory name of the current module

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory

app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for single-page applications (SPA)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
