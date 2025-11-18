const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 785;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/pdfFiles", (req, res) => {
    res.render("pdfFiles");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on ${PORT}`);
});
