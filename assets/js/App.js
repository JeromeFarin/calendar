import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import Filter from './components/Filter'
import Calendar from './components/Calendar'
import StaffStore from './stores/StaffStore'
import DateStore from './stores/DateStore'
import PrestationStore from './stores/PrestationStore'
import UnavailabilityStore from './stores/UnavailabilityStore'
import PlaceStore from './stores/PlaceStore'

class App extends Component {
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

ReactDOM.render(
  <Provider
    staffStore={StaffStore}
    dateStore={DateStore}
    prestationStore={PrestationStore}
    unavailabilityStore={UnavailabilityStore}
    placeStore={PlaceStore}
  >
    <App />
  </Provider>,
  document.getElementById('app')
)
