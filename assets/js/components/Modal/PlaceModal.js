import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import '../../../css/place_modal.css'

@inject('modalStore', 'placeStore')
@observer
class PlaceModal extends Component {
  handleClick = () => {
    this.props.modalStore.togglePlaceModal()
  }

  handleSetValue = (event) => {
    this.props.placeStore.setPlace(event.target.value)
  }

  handleConfirm = () => {
    this.props.modalStore.togglePlaceModal()
    this.props.modalStore.toggleConfirmModal()
  }

  render () {
    let staff = ''
    if (this.props.placeStore.places.length !== 0) {
      staff = this.props.placeStore.places[0].staff.pseudo
    }
    return (
      <Modal id='place_modal' show={this.props.modalStore.placeModal} onHide={this.handleClick} centered>
        <Modal.Header>
          <h3>{staff} is available</h3>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column align-items-center'>
          {this.props.placeStore.places.map((place) => (
            <div className='form-check' key={place.id}>
              <input className='form-check-input' type='radio' name='place_radio' id={`radio_${place.id}`} value={place.id} onClick={this.handleSetValue} />
              <label className='form-check-label' htmlFor={`radio_${place.id}`}>{place.start.format('HH:mm')} - {place.end.format('HH:mm')}</label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={this.handleConfirm}>Confirm</Button>
          <Button variant='secondary' onClick={this.handleClick}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PlaceModal
