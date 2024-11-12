const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db');

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
    const { name, email, nim, major, birth_place_date, address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (name, email, nim, major, birth_place_date, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, nim, major, birth_place_date, address, hashedPassword],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error registering user');
            }
            res.redirect('/login');
        }
    );
});

router.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching user');
        }
        res.json(results[0]);
    });
});

router.post('/users/update/:id', (req, res) => {
    const { name, email, nim, major, birth_place_date, address, password } = req.body;
    const id = req.params.id;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating user');
        }

        db.query(
            'UPDATE users SET name = ?, email = ?, nim = ?, major = ?, birth_place_date = ?, address = ?, password = ? WHERE id = ?',
            [name, email, nim, major, birth_place_date, address, hashedPassword, id],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error updating user');
                }
                res.redirect('/profile');
            }
        );
    });
});

router.post('/users/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting user');
        }
        res.redirect('/login');
    });
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error during login');
        }
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.send('Invalid email or password');
        }

        req.session.user = results[0];
        res.redirect('/profile');
    });
});

router.get('/profile', checkAuth, (req, res) => {
    const userId = req.session.user.id;

    db.query('SELECT * FROM biotas WHERE user_id = ?', [userId], (err, biotas) => {
        if (err) throw err;

        db.query('SELECT * FROM corals WHERE user_id = ?', [userId], (err, corals) => {
            if (err) throw err;

            res.render('profile', {
                user: req.session.user,
                biotas,
                corals
            });
        });
    });
});

router.post('/biotas/add', checkAuth, (req, res) => {
    const { name, species, population, convertation_status, locate } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO biotas (user_id, name, species, population, convertation_status, locate) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, name, species, population, convertation_status, locate],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding biota');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/biotas/update/:id', checkAuth, (req, res) => {
    const { name, species, population, convertation_status, locate } = req.body;
    const biotaId = req.params.id;

    db.query(
        'UPDATE biotas SET name = ?, species = ?, population = ?, convertation_status = ?, locate = ? WHERE id = ?',
        [name, species, population, convertation_status, locate, biotaId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating biota');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/biotas/delete/:id', checkAuth, (req, res) => {
    const biotaId = req.params.id;

    db.query('DELETE FROM biotas WHERE id = ?', [biotaId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting biota');
        }
        res.redirect('/profile');
    });
});

router.post('/corals/add', checkAuth, (req, res) => {
    const { locate, damage_percent, water_condition } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO corals (user_id, locate, damage_percent, water_condition) VALUES (?, ?, ?, ?)',
        [userId, locate, damage_percent, water_condition],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding coral');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/corals/update/:id', checkAuth, (req, res) => {
    const { locate, damage_percent, water_condition } = req.body;
    const coralId = req.params.id;

    db.query(
        'UPDATE corals SET locate = ?, damage_percent = ?, water_condition = ? WHERE id = ?',
        [locate, damage_percent, water_condition, coralId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating coral');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/corals/delete/:id', checkAuth, (req, res) => {
    const coralId = req.params.id;

    db.query('DELETE FROM corals WHERE id = ?', [coralId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting coral');
        }
        res.redirect('/profile');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

module.exports = router;
