import React from 'react'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import '../css/date.css'

export default class Date extends React.Component {
  state = {
    date: moment(),
    monthsShow: false
  }

  componentDidMount () {
    this.setState({ date: moment() })
  }

  componentDidUpdate () {
    this.props.store.week = this.state.date.week()
    this.props.store.year = this.state.date.year()
  }

  handleMonthsHide = () => {
    this.setState({
      date: moment().week(this.state.date.week()),
      monthsShow: false
    })
  }

  handleMonthsShow = () => {
    this.setState({
      date: moment().week(this.state.date.week()),
      monthsShow: true
    })
  }

  handleMonthChoice = (event) => {
    this.handleMonthsHide()
    this.setState({ date: moment().month(event.target.value) })
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
    this.setState({ date: moment().week(this.state.date.week() + 1) })
  }

  handlePreviousWeek = () => {
    this.setState({ date: moment().week(this.state.date.week() - 1) })
  }

  render () {
    return (
      <div>
        <div>
          <Button variant='' onClick={this.handlePreviousWeek}><FontAwesomeIcon icon={faCaretSquareLeft} /></Button>
          <Button variant='primary' onClick={this.handleMonthsShow}>{this.state.date.format('MMMM')} week {this.state.date.week()}</Button>
          <Button variant='' onClick={this.handleNextWeek}><FontAwesomeIcon icon={faCaretSquareRight} /></Button>
        </div>

        {this.monthsModal()}
      </div>
    )
  }
}
