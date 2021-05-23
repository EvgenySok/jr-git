const https = require('https')

module.exports = {
  async getRepos() {
    const options = {
      host: 'api.github.com',
      path: '/search/repositories?q=stars:%3E1&sort=stars',
      headers: { 'User-Agent': 'node.js' },
      method: 'GET',
    }
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        const chunks = []
        res.on("data", (chunk) => {
          chunks.push(chunk)
        })

        res.on("end", () => {
          const buff = Buffer.concat(chunks)
          const json = JSON.parse(buff.toString())
          const data = json.items //.map(repo => {
            // const { id, name, stargazers_count } = repo
            // return { id, name, stars: stargazers_count }
          // })
          resolve(data)
        })
      }).on('error', (e) => {
        reject(e)
      })

      req.end()
    })
  }
}