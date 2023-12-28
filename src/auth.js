const http = require('http');
const fs = require('fs');
const path = require('path');
const { encrypt } = require('../encrypt.service');
const pool = require('../db');

class AuthController {
  async registrationPage(req, res) {
    const registrationHtml = fs.readFileSync(path.join(__dirname, '/../../public/registration.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(registrationHtml);
  }

  async registration(req, res) {
    try {
      const { fio, username, password } = req.body;
      const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser.rows.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Username already exists' }));
        return;
      }

      const hashedPassword = encrypt(password);
      const result = await pool.query('INSERT INTO users (fio, username, password) VALUES ($1, $2, $3) RETURNING *', [
        fio,
        username,
        hashedPassword,
      ]);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Registration successful' }));

      const newUser = result.rows[0];
      // Обработка сессий (если нужно)
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error: ' + error.message }));
    }
  }

  async loginPage(req, res) {
    const loginHtml = fs.readFileSync(path.join(__dirname, '/../../public/login.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(loginHtml);
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length === 0 || result.rows[0].password !== encrypt(password)) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid credentials' }));
        return;
      }

      const newUser = result.rows[0];
      // Обработка сессий (если нужно)

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Login successful' }));
      res.writeHead(302, { 'Location': '/' });
      res.end();
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error: ' + error.message }));
    }
  }

  async logout(req, res) {
    // Обработка выхода из сессии (если нужно)
    res.writeHead(302, { 'Location': '/login' });
    res.end();
  }
}

const server = http.createServer((req, res) => {
  // Обработка маршрутов вручную или с использованием соответствующего маршрутизатора
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
