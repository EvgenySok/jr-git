const Router = require('express')
const router = new Router()

const db = require('../db')


router.get('/github', async (req, res) => {
  const { rows } = await db.query('SELECT data FROM repositories')
  res.json(rows)
})

module.exports = router