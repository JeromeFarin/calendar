import React, { Component } from 'react'
import Staff from './Staff'

class Day extends Component {
  state = {
    opened: {
      start: {
        hours: '09',
        minutes: '00'
      },
      end: {
        hours: '16',
        minutes: '00'
      }
    }
  }

  render () {
    return (
      this.props.staffs.map((staff, i) => (
        <Staff
          key={staff.id}
          left={`${i}0px`}
          staff={staff}
          opened={this.state.opened}
          date={this.props.date}
          unavailabilities={this.props.unavailabilities.filter((unavailability) => unavailability.staff === `/api/users/${staff.id}`)}
        />
      ))
    )
  }
}

export default Day
