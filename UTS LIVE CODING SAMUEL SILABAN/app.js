const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./auth');
const db = require('./db');

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('login');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});