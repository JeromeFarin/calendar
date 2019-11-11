import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import '../../../css/staff_modal.css'

@inject('modalStore', 'staffStore')
@observer
class StaffModal extends Component {
  componentDidUpdate () {
    this.props.staffStore.loadSelected()
  }

  handleModal = () => {
    this.props.modalStore.toggleStaffModal()
  }

  handleClick = (event) => {
    this.props.staffStore.staffUpdate(event.target.value)
  }

  handleRemove = () => {
    this.props.staffStore.removeAll()
  }

  render () {
    const [...staffs] = this.props.staffStore.staffs
    return (
      <Modal id='staff_modal' show={this.props.modalStore.staffModal} onHide={this.handleModal} centered>
        <Modal.Header>
          <h3>Choose your staffs</h3>
        </Modal.Header>
        <Modal.Body>
          <li className={this.props.staffStore.isSelected ? 'selected' : ''} onClick={this.handleRemove}>{'I don\'t know'}</li>
          {staffs.map((staff) => (
            <li
              key={staff.id}
              onClick={this.handleClick}
              value={staff.id}
              className={staff.selected ? 'selected' : ''}
            >
              {staff.pseudo}
            </li>
          ))}
          <em>You have possibility to change after</em>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={this.handleModal}>Confirm</Button>
          <Button variant='secondary' onClick={this.handleModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default StaffModal
