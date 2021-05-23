const db = require('../db')

module.exports = {
  async gerReposFromDB() {
    const queryParam = `
    SELECT data  ->> 'id' AS id,
           data  ->> 'name' AS name
    FROM repositories;
    `
    const result = await db.query(queryParam)

    return result.rows
  }
}