import React, { useState } from 'react'

const Navbar = ({ setVisible }) => {
  const [inputValue, setInputValue] = useState('')

  async function getAll(e) {
    e.preventDefault()
    const res = await fetch('/api/v1/github')
    const data = await res.json()
    setVisible(data)
  }

  async function update(e) {
    e.preventDefault()
    const response = await fetch('/api/v1/github', {
      method: 'PUT'
    })
    const json = await response.json()
    setVisible(json)
    console.log('Success ... ')
  }

  async function getOneRepo(e) {
    e.preventDefault()
    const res = await fetch(`/api/v1/github/${inputValue}`)
    const data = await res.json()

    setVisible(data.length === 0 ? ["No such repository in the database ..."] : data.map(it => it.data))
  }

  const onChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
  }

  return (
    <header className="navbar" >
      <h3>GitHub stars</h3>
      <ul className="navbar-menu">
        <li><a href="#" onClick={getAll}>Get all repositories</a></li>
        <li><a href="#" onClick={update}>Update</a></li>
        <li>
          <form className="search-container">
            <input type="text" id="search-bar" value={inputValue} onChange={onChange} placeholder="id or name" />
            <a href="#" onClick={getOneRepo}>
              <img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="serch" />
            </a>
          </form>
        </li>
      </ul>
    </header>
  )
}

export default Navbar
