const express = require('express');
const app = express();
const cors=require('cors') //for allowing cross origin requests for different url

const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(cors({
    origin: 'http://localhost:3000' //with this origin we can make the cross origin request to localhost:3000
}))
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});