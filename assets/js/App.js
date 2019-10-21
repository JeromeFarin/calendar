import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Filter from './Filter'
import Calendar from './Calendar'
import store from './Store'

class App extends Component {
  render () {
    return (
      <div>
        <div id='filter'>
          <Filter store={store} />
        </div>
        <div id='calendar'>
          <Calendar store={store} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
