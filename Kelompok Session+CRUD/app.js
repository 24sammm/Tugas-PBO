const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth'); 
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (!req.session.user && !['/auth/login', '/auth/register'].includes(req.path)) {
        return res.redirect('/auth/login');
    }
    next();
});


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/auth/profile');
    } else {
        return res.redirect('/auth/login');
    }
});

app.get('/profile', (req, res) => {
    const userId = req.session.userId; 
    const userQuery = 'SELECT * FROM users WHERE id = ?';
    const agendaQuery = 'SELECT * FROM agendas';

    db.query(userQuery, [userId], (err, userResult) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user data');
        }

        if (!userResult.length) {
            return res.status(404).send('User not found');
        }
        
        const user = userResult[0];

        db.query(agendaQuery, (err, agendaResult) => {
            if (err) {
                console.error('Error fetching agendas:', err);
                return res.status(500).send('Error fetching agenda data');
            }

            res.render('profile', { user, agendas: agendaResult });
        });
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!'); 
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
