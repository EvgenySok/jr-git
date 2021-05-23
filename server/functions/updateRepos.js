const db = require('../db')
const { getRepos } = require('./getRepos')


module.exports = {
  async updateRepos(repos) {
    console.log('Start setInterval !!!')
    const newRepos = repos ? repos : await getRepos()
    await db.query('TRUNCATE TABLE repositories')
    const results = []
    for (const item of newRepos) {
      const result = await db.query('INSERT INTO repositories(data) VALUES($1)', [item])
      results.push(result)
    }
  }
}