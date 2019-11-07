import React, { Component } from 'react'
import '../../../css/staff.css'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import Slot from './Slot'

@inject('slotStore', 'prestationStore')
@observer
class Staff extends Component {
  render () {
    return (
      <div className='staff' style={{ marginLeft: this.props.left }}>
        {this.props.slotStore.slots.filter((slot) => (
          slot.staff.id === this.props.staff.id &&
          slot.day === this.props.day
        )).map((slot) => {
          if (parseInt(slot.type, 10) === 1 && (moment(slot.end) - moment(slot.start)) < this.props.prestationStore.getTime()) {
            return (
              <Slot
                key={slot.id}
                type={0}
                staff={slot.staff}
                size={slot.size}
                start={slot.start}
                end={slot.end}
              />
            )
          }
          return (
            <Slot
              key={slot.id}
              id={slot.id}
              type={slot.type}
              staff={slot.staff}
              size={slot.size}
              start={slot.start}
              end={slot.end}
            />
          )
        })}
      </div>
    )
  }
}

export default Staff
