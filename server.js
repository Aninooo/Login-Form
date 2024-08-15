const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bryan',
    database: 'login_form'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//login form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'loginForm.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    db.query(sql, [username, hashedPassword], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.send('Login Failed');
            return;
        }

        if (results.length > 0) {
            res.send('Login Succeed');
        } else {
            res.send('Login Failed');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
