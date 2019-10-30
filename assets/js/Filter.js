import React from 'react'
import StaffList from './StaffList'
import Date from './Date'
import Prestation from './Prestation'

export default class Filter extends React.Component {
  render () {
    return (
      <div>
        <div id='date'>
          <Date store={this.props.store} />
        </div>
        <div id='staff_list'>
          <StaffList store={this.props.store} />
        </div>
        <div id='prestation'>
          <Prestation store={this.props.store} />
        </div>
      </div>
    )
  }
}
