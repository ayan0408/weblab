// Node.js does not support import/export by default in CommonJS modules.
// So, we use require instead of import.

const dotenv = require('dotenv');
const { executeSQL } = require('./db');
const Node = require('node');
const router = require('./routes');
const path = require('path');
const bodyParser = require('bodyparser');
const session = require('session');
const nodeStatic = require('static');

dotenv.config();

const app = new Node();
app.keys = [process.env.SECRET_KEY || 'default-secret-key'];

const PORT = process.env.PORT || 5000;

app.use(session(app));
app.use(koaStatic(path.join(__dirname, 'public')));


const createUserTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  fio VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

executeSQL(createSessionTableSQL);
executeSQL(createUserTableSQL);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
