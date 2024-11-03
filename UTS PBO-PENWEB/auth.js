const express = require('express');
const bcrypt = require('bcryptjs');
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
    const { name, nim, major, birth_place_date, address, email, password, instrument } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (name, nim, major, birth_place_date, address, email, password, instrument) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, nim, major, birth_place_date, address, email, hashedPassword, instrument],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error registering user');
            }
            res.redirect('/login');
        }
    );
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

    db.query('SELECT * FROM scales WHERE user_id = ?', [userId], (err, scales) => {
        if (err) throw err;

        db.query('SELECT * FROM schedules WHERE user_id = ? ORDER BY scheduled_date, scheduled_time', [userId], (err, schedules) => {
            if (err) throw err;

            db.query('SELECT * FROM achievements WHERE user_id = ?', [userId], (err, achievements) => {
                if (err) throw err;

                res.render('profile', {
                    user: req.session.user,
                    scales,
                    schedules,
                    achievements
                });
            });
        });
    });
});

router.post('/achievements/add', checkAuth, (req, res) => {
    const { achievement_name, description, awarded_date } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO achievements (user_id, achievement_name, description, awarded_date) VALUES (?, ?, ?, ?)',
        [userId, achievement_name, description, awarded_date],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding achievement');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/achievements/update/:id', checkAuth, (req, res) => {
    const { achievement_name, description, awarded_date } = req.body;
    const achievementId = req.params.id;

    db.query(
        'UPDATE achievements SET achievement_name = ?, description = ?, awarded_date = ? WHERE id = ?',
        [achievement_name, description, awarded_date, achievementId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating achievement');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/achievements/delete/:id', checkAuth, (req, res) => {
    const achievementId = req.params.id;

    db.query('DELETE FROM achievements WHERE id = ?', [achievementId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting achievement');
        }
        res.redirect('/profile');
    });
});

router.post('/scales/add', checkAuth, (req, res) => {
    const { name, instrument, base_note, scale_type, difficulty, diagram, progress } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO scales (user_id, name, instrument, base_note, scale_type, difficulty, diagram, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, name, instrument, base_note, scale_type, difficulty, diagram, progress],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding scale');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/scales/update/:id', checkAuth, (req, res) => {
    const { name, instrument, base_note, scale_type, difficulty, diagram, progress } = req.body;
    const scaleId = req.params.id;

    db.query(
        'UPDATE scales SET name = ?, instrument = ?, base_note = ?, scale_type = ?, difficulty = ?, diagram = ?, progress = ? WHERE id = ?',
        [name, instrument, base_note, scale_type, difficulty, diagram, progress, scaleId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating scale');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/scales/delete/:id', checkAuth, (req, res) => {
    const scaleId = req.params.id;

    db.query('DELETE FROM scales WHERE id = ?', [scaleId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting scale');
        }
        res.redirect('/profile');
    });
});

router.post('/schedules/add', checkAuth, (req, res) => {
    const { progression_name, instrument, difficulty, scheduled_date, scheduled_time, notes } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO schedules (user_id, progression_name, instrument, difficulty, scheduled_date, scheduled_time, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, progression_name, instrument, difficulty, scheduled_date, scheduled_time, notes],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding schedule');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/schedules/update/:id', checkAuth, (req, res) => {
    const { progression_name, instrument, difficulty, scheduled_date, scheduled_time, notes } = req.body;
    const scheduleId = req.params.id;

    db.query(
        'UPDATE schedules SET progression_name = ?, instrument = ?, difficulty = ?, scheduled_date = ?, scheduled_time = ?, notes = ? WHERE id = ?',
        [progression_name, instrument, difficulty, scheduled_date, scheduled_time, notes, scheduleId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating schedule');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/schedules/delete/:id', checkAuth, (req, res) => {
    const scheduleId = req.params.id;

    db.query('DELETE FROM schedules WHERE id = ?', [scheduleId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting schedule');
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
