import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import '../../../css/prestation_modal.css'
import moment from 'moment'

@inject('modalStore', 'prestationStore')
@observer
class PrestationModal extends Component {
  handleModal = () => {
    this.props.modalStore.togglePrestationModal()
  }

  handleClick = (event) => {
    this.props.prestationStore.prestationUpdate(event.target.value)
  }

  handleConfirm = () => {
    this.props.modalStore.toggleStaffModal()
    this.props.modalStore.togglePrestationModal()
  }

  handleRemove = () => {
    this.props.prestationStore.removeAll()
  }

  render () {
    this.props.prestationStore.loadSelected()
    const [...prestations] = this.props.prestationStore.prestations
    return (
      <Modal id='prestation_modal' show={this.props.modalStore.prestationModal} onHide={this.handleModal} centered>
        <Modal.Header>
          <h3>Choose your prestations</h3>
        </Modal.Header>
        <Modal.Body>
          <li className={this.props.prestationStore.isSelected ? 'selected' : ''} onClick={this.handleRemove}>I don't know</li>
          {prestations.map((prestation) => (
            <li
              key={prestation.id}
              onClick={this.handleClick}
              value={prestation.id}
              className={prestation.selected ? 'selected' : ''}
            >
              {prestation.name} ({moment(prestation.timeMaking).format('HH:mm')})
            </li>
          ))}
          <em>You have possibility to change after</em>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={this.handleConfirm}>Confirm</Button>
          <Button variant='secondary' onClick={this.handleModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PrestationModal
