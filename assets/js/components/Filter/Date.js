import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import '../../../css/date.css'
import { observer, inject } from 'mobx-react'

@inject('dateStore')
@observer
class Date extends Component {
  state = {
    monthsShow: false
  }

  handleMonthsHide = () => {
    this.setState({
      monthsShow: false
    })
  }

  handleMonthsShow = () => {
    this.setState({
      monthsShow: true
    })
  }

  handleMonthChoice = (event) => {
    this.handleMonthsHide()
    this.props.dateStore.selectMonth(event.target.value)
  }

  monthsModal = () => {
    const months = moment.months()
    return (
      <Modal show={this.state.monthsShow} onHide={this.handleMonthsHide} centered>
        <Modal.Body>
          <div>
            {months.map((month) => <Button className='month' key={month} value={month} onClick={this.handleMonthChoice}>{month}</Button>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.handleMonthsHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  handleNextWeek = () => {
    this.handleMonthsHide()
    this.props.dateStore.addWeek()
  }

  handlePreviousWeek = () => {
    this.handleMonthsHide()
    this.props.dateStore.removeWeek()
  }

  render () {
    return (
      <div>
        <div>
          <Button variant='' onClick={this.handlePreviousWeek}><FontAwesomeIcon icon={faCaretSquareLeft} /></Button>
          <Button
            variant='primary'
            onClick={this.handleMonthsShow}
          >
            {this.props.dateStore.date.format('MMMM')} week {this.props.dateStore.date.week()}
          </Button>
          <Button variant='' onClick={this.handleNextWeek}><FontAwesomeIcon icon={faCaretSquareRight} /></Button>
        </div>

        {this.monthsModal()}
      </div>
    )
  }
}

export default Date
