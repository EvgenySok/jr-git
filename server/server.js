const express = require('express')
const bodyParser = require('body-parser')
const { updateRepos } = require('./functions/updateRepos')
const { getRepos } = require('./functions/getRepos')
const { getRepoById } = require('./functions/getRepoById')
const { getRepoByName } = require('./functions/getRepoByName')
const { gerReposFromDB } = require('./functions/gerReposFromDB')

const db = require('./db')

const { resolve } = require('path')

require('dotenv').config()
const PORT = process.env.PORT || 5000
const INTERVAL = 1000 * 60 * 10
let updateInterval

db.connect()
const server = express()

server.use(express.static(resolve(__dirname, '../dist')))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/api/v1/github/:pram', async (req, res) => {
  const pram = req.params.pram
  if (isNaN(+pram)) { // name
    res.json(await getRepoByName(pram))
  } else { // id
    res.json(await getRepoById(pram))
  }
})

server.get('/api/v1/github', async (req, res) => {
  res.json(await gerReposFromDB()) 
})

server.put('/api/v1/github', async (req, res) => {
  clearInterval(updateInterval)
  const repos = await getRepos()
  updateRepos(repos)
  updateInterval = setInterval(updateRepos, INTERVAL)
  res.json(repos)
})

server.listen(PORT, () => {
  console.log(`Server has been started at http://localhost:${PORT}...`)
  db.on('connect', () => {
    updateRepos()
    updateInterval = setInterval(updateRepos, INTERVAL)
  })
})

