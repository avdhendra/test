const express = require('express');
const app = express();
const cors=require('cors') //for allowing cross origin requests for different url

const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors())
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});