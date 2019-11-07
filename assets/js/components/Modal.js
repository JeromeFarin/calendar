import React, { Component } from 'react'
import PlaceModal from './Modal/PlaceModal'
import MonthModal from './Modal/MonthModal'
import StaffModal from './Modal/StaffModal'
import PrestationModal from './Modal/PrestationModal'

export default class Modal extends Component {
  render () {
    return (
      <div id='modals'>
        <PlaceModal />
        <MonthModal />
        <StaffModal />
        <PrestationModal />
      </div>
    )
  }
}