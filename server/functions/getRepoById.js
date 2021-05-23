const db = require('../db')

module.exports = {
  async getRepoById(id) {
    const queryParam = `
    SELECT data 
    FROM repositories
    WHERE data ->> 'id' = '${id}';
    ` 
    const result = await db.query(queryParam)

    return result.rows
  }
}