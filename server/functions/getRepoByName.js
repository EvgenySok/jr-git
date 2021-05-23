const db = require('../db')

module.exports = {
  async getRepoByName(name) {
    const queryParam = `
    SELECT data 
    FROM repositories
    WHERE data ->> 'name' = '${name}';
    ` 
    const result = await db.query(queryParam)

    return result.rows
  }
}