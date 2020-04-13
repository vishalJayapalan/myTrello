import React from 'react'

function App () {
  return (
    <div className='App'>
      <nav className='nav'>
        <div>
          <button className='button'>Home</button>
          <button className='button'>Boards</button>
          <input type='text' placeholder='Search...' className='navInput' />
        </div>
        <p className='navP'>Trello </p>
        <div>
          <button className='button'>+</button>
          <button className='button'>i</button>
          <button className='button'>notification</button>
        </div>
      </nav>
    </div>
  )
}

export default App
