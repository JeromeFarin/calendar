import React, { Component } from 'react'
import moment from 'moment'
import '../../../css/slot.css'
import { inject, observer } from 'mobx-react'

@inject('modalStore', 'prestationStore', 'placeStore')
@observer
class Slot extends Component {
  handleClick = (e) => {
    if (this.props.prestationStore.selectedPrestations().length > 0) {
      this.props.placeStore.slotId = e.target.dataset.slotId
      this.props.modalStore.togglePlaceModal()
    } else {
      this.props.modalStore.togglePrestationModal()
      this.props.modalStore.staffWay = false
    }
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
