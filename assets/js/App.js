import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
import React from 'react'
import Filter from './Filter'
import Calendar from './Calendar'

class App extends React.Component {
  render () {
    return (
      <div>
        <div id='filter'>
          <Filter />
        </div>
        <div id='calendar'>
          <Calendar />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
