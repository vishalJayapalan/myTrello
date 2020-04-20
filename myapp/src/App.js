import React from 'react'
import Navbar from './components/navbar.js'
import Boards from './components/boards.js'
import Lists from './components/lists.js'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <div>
        <Boards />
      </div>
      <div>
        <Lists />
      </div>
    </div>
  )
}

export default App
