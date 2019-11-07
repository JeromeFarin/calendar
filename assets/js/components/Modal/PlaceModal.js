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
    return (
      <Modal show={this.props.modalStore.placeModal} onHide={this.handleClick} centered>
        <Modal.Body>
          {this.props.modalStore.places}
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
