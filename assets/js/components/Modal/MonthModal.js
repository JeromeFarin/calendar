import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import '../../../css/date_modal.css'

@inject('modalStore', 'dateStore')
@observer
class MonthModal extends Component {
  handleClick = () => {
    this.props.modalStore.toggleMonthModal()
  }

  handleMonthChoice = (event) => {
    this.handleClick()
    this.props.dateStore.selectMonth(event.target.value)
  }

  render () {
    const months = moment.months()
    return (
      <Modal id='date_modal' show={this.props.modalStore.monthModal} onHide={this.handleClick} centered>
        <Modal.Body>
          <div>
            {months.map((month) => <Button className='month' key={month} value={month} onClick={this.handleMonthChoice}>{month}</Button>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.handleClick}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default MonthModal
