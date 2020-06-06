import React from 'react'
import Navbar from './components/navbar.js'
import Boards from './components/boards.js'
import Lists from './components/lists.js'
import Home from './components/home.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Boards' component={Boards} />
          <Route path='/lists/:boardId' component={Lists} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
