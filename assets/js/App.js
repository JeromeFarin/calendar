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
import SlotStore from './stores/SlotStore'
import ModalStore from './stores/ModalStore'
import Modal from './components/Modal'

class App extends Component {
  render () {
    return (
      <div>
        <Modal />
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
    slotStore={SlotStore}
    modalStore={ModalStore}
  >
    <App />
  </Provider>,
  document.getElementById('app')
)
