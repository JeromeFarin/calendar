import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'

@inject('modalStore')
@observer
class PlaceModal extends Component {
  handleClick = () => {
    this.props.modalStore.togglePlaceModal()
  }

  render () {
    let staff = ''
    if (this.props.modalStore.places.length !== 0) {
      staff = this.props.modalStore.places[0].staff.pseudo
    }
    return (
      <Modal show={this.props.modalStore.placeModal} onHide={this.handleClick} centered>
        <Modal.Header>
          <h3>{staff}</h3>
        </Modal.Header>
        <Modal.Body>
          {this.props.modalStore.places.map((place) => (
            <div className='form-check' key={place.id}>
              <input className='form-check-input' type='radio' name='place_radio' id={`radio_${place.id}`} value={place.id} />
              <label className='form-check-label' htmlFor={`radio_${place.id}`}>{place.start.format('HH:mm')} - {place.end.format('HH:mm')}</label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary'>Confirm</Button>
          <Button variant='secondary' onClick={this.handleClick}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PlaceModal
