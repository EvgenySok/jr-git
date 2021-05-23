import React, { useState } from 'react'
import Navbar from './navbar'

const Home = () => {
  const [visible, setVisible] = useState(['No repository selected ...'])

  async function showReposipoty(id) {
    const res = await fetch(`/api/v1/github/${id}`)
    const data = await res.json()
    setVisible(data.map(it => it.data))
  }

  return (
    <>
      <Navbar setVisible={setVisible} />
      <div className="container">
        {visible.length > 1 ?
          <>
            <h2>Trending repositories with the most number of Stars</h2>
            {visible.map((it, index) => (
              <div className="item" key={index}>
                <a href="#" onClick={() => showReposipoty(it.id)}>{it.name}</a>
              </div>
            ))}
          </>
          :
          <>
            <h2>Properties of the repository <em>{visible[0].name ? visible[0].name : null}</em></h2>
            <pre className="item">{JSON.stringify(visible[0], null, 2)}</pre>
          </>
        }
      </div>
    </>
  )
}

export default Home
