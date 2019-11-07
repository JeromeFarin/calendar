import React, { Component } from 'react'
import moment from 'moment'
import '../../../css/slot.css'
import { inject, observer } from 'mobx-react'

@inject('modalStore')
@observer
class Slot extends Component {
  handleClick = (e) => {
    this.props.modalStore.slotId = e.target.dataset.slotId
    this.props.modalStore.togglePlaceModal()
  }

  render () {
    if (parseInt(this.props.type, 10) === 1) {
      return (
        <div
          data-slot-id={this.props.id}
          className='slot available'
          style={{
            backgroundColor: `rgb(${this.props.staff.color})`,
            height: `${this.props.size}%`
          }}
          onClick={this.handleClick}
        >
          <span>{moment(this.props.start).format('HH:mm')}</span>
          <span>{moment(this.props.end).format('HH:mm')}</span>
        </div>
      )
    }

    return (
      <div
        className='slot unavailable'
        style={{
          zIndex: 0,
          height: `${this.props.size}%`
        }}
      />
    )
  }
}

export default Slot
