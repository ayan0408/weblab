const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: 5432,
});

async function executeSQL(sql) {
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('SQL command executed successfully');
  } catch (error) {
    console.error('Error executing SQL command:', error.message);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  executeSQL,
};
