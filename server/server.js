const path = require('path');
const express = require("express");
const publicPath = path.join(__dirname, '/../public');
const app = express();
const port = process.env.PORT || 3000;

// Tell express to use the public path
app.use(express.static(publicPath))

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});


