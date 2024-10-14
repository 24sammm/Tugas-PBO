const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pbo'
});

connection.connect((err) => {
    if (err) {
        console.error("Error Connecting to MYSQL", err.stack);
        return;
    }
    console.log("Connection MySQL Done with id " + connection.threadId);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY id ASC LIMIT 100';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.render('index', { products: results });
    });
});

app.post('/add', (req, res) => {
    const { id,name, price } = req.body;
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(query, [id,name, price], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            res.status(500).send('Error inserting product');
            return;
        }
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching product for edit:', err);
            res.status(500).send('Error fetching product');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('Product not found');
            return;
        }
        res.render('edit', { product: result[0] });
    });
});

app.post('/update/:id', (req, res) => {
    const { name, price } = req.body;
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    connection.query(query, [name, price, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
            return;
        }
        res.redirect('/');
    });
});

app.get('/delete/:id', (req, res) => {
    const query = 'DELETE FROM products WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).send('Error deleting product');
            return;
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log("Server berjalan di port 3000, buka web melalui http://localhost:3000");
});
