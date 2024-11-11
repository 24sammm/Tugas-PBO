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

router.get('/login', (req, res) => {
    res.render('login');
});
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

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
    const { name, email, pekerjaan, address, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
        'INSERT INTO users (id,name, email, pekerjaan, address, password ) VALUES (?, ?, ?, ?, ?)',
        [name, email, pekerjaan, address, hashedPassword ],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error registering user');
            }
            res.redirect('/login');
        }
    );
    
});

router.get('/profile', checkAuth, (req, res) => {
    const userId = req.session.user.id;

    db.query('SELECT * FROM ikan WHERE user_id = ?', [userId], (err, ikan) => {
        if (err) throw err;

        db.query('SELECT * FROM stok WHERE user_id = ? ORDER BY nama_ikan, jumlah_ikan', [userId], (err, stok) => {
            if (err) throw err;
            res.render('profile', {
                users: req.session.user,
                ikan: ikan,
                stok: stok
            });
        });
    });
});

router.post('/ikan/add', checkAuth, (req, res) => {
    const { nama_ikan, jenis_ikan, jumlah_ikan } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO ikan (user_id, nama_ikan, jenis_ikan, jumlah_ikan) VALUES (?, ?, ?, ?)',
        [userId, nama_ikan, jenis_ikan, jumlah_ikan],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding fish');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/ikan/update/:id', checkAuth, (req, res) => {
    const { nama_ikan, jenis_ikan, jumlah_ikan } = req.body;
    const ikanId = req.params.id;

    db.query(
        'UPDATE ikan SET nama_ikan = ?, jenis_ikan = ?, jumlah_ikan = ? WHERE id = ?',
        [nama_ikan, jenis_ikan, jumlah_ikan, ikanId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating fish');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/ikan/delete/:id', checkAuth, (req, res) => {
    const ikanId = req.params.id;

    db.query('DELETE FROM ikan WHERE id = ?', [ikanId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting fish');
        }
        res.redirect('/profile');
    });
});

router.post('/stok/add', checkAuth, (req, res) => {
    const { nama_ikan, stok_ikan } = req.body;
    const userId = req.session.user.id;

    db.query(
        'INSERT INTO stok (user_id, nama_ikan, stok_ikan) VALUES (?, ?, ?)',
        [userId, nama_ikan, stok_ikan],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding stock');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/stok/update/:id', checkAuth, (req, res) => {
    const { nama_ikan, stok_ikan } = req.body;
    const stokId = req.params.id;

    db.query(
        'UPDATE stok SET nama_ikan = ?, stok_ikan = ? WHERE id = ?',
        [nama_ikan, stok_ikan, stokId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating stock');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/stok/delete/:id', checkAuth, (req, res) => {
    const stokId = req.params.id;

    db.query('DELETE FROM stok WHERE id = ?', [stokId], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting stock');
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
