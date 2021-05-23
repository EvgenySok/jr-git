require('dotenv').config()
const { Client } = require('pg');

const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);
`

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
client.on('connect', async() => {
  console.log('connected to db')
  await client.query(createTableText)
})

module.exports = client
