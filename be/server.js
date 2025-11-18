const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 785;
const router = require('./middleware/router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on ${PORT}`);
});
