const express = require("express");

const app = express();
const PORT = 3306;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Data

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});