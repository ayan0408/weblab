const fs = require('fs');
const path = require('path');
const pool = require('../db');
const { encrypt } = require('../service');

class SomeController {
  async mainPage(req, res) {
    const indexHtml = fs.readFileSync(path.join(__dirname, '/../../public/index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  }

  async protectedPage(req, res) {
    const protectedHtml = fs.readFileSync(path.join(__dirname, '/../../public/protected.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(protectedHtml);
  }
}

module.exports = new SomeController();
