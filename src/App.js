import React from 'react'
import './App.css'

import {Route} from 'react-router-dom'
import Home from './views/home'
import Search from './views/search'

class BooksApp extends React.Component {
  
  render() {
    return(
      <div>
        <Route exact path='/' component={Home}/>
        <Route exact path='/search' component={Search}/>
      </div>
    )
  }
}

export default BooksApp
