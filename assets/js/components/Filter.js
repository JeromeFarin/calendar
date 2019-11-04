import React, { Component } from 'react'
import StaffList from './Filter/StaffList'
import Date from './Filter/Date'
import Prestation from './Filter/Prestation'

export default class Filter extends Component {
  render () {
    return (
      <div>
        <div id='date'>
          <Date />
        </div>
        <div id='staff_list'>
          <StaffList />
        </div>
        <div id='prestation'>
          <Prestation />
        </div>
      </div>
    )
  }
}
