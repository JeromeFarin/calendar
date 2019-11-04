import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Staff from './Staff'

@inject('staffStore')
@observer
class Day extends Component {
  render () {
    return (
      this.props.staffStore.staffSelected().map((staff, i) => (
        <Staff
          key={staff.id}
          left={`${i}0px`}
          staff={staff}
          day={this.props.day}
        />
      ))
    )
  }
}

export default Day
