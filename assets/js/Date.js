import React from 'react'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import '../css/date.css'

export default class Date extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      date: '',
      monthsShow: false
    }
  }

  componentWillMount() {
    this.setState({date: moment()})
  }
  
  handleMonthsHide = () => {
    this.setState({
      date: moment().week(this.state.date.week()-1),
      monthsShow: false
    })
  }

  handleMonthsShow = () => {
    this.setState({
      date: moment().week(this.state.date.week()-1),
      monthsShow: true
    })
  }

  handleMonthChoice = (event) => {
    this.handleMonthsHide()
    this.setState({date: moment().month(event.target.value)})
  }

  monthsModal = () => {
    const months = moment.months()
    return(
      <Modal show={this.state.monthsShow} onHide={this.handleMonthsHide} centered>
        <Modal.Body>
          <div>
            {months.map((month) =>
              <Button className="month" key={month} value={month} onClick={this.handleMonthChoice}>{month}</Button>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.handleMonthsHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  handleNextWeek = () => {
    this.setState({date: moment().week(this.state.date.week())})
  }

  handlePreviousWeek = () => {
    this.setState({date: moment().week(this.state.date.week()-2)})
  }

  render () {
    const date = this.state.date
    
    return (
      <div>
        <div>
          <Button variant='' onClick={this.handlePreviousWeek}><FontAwesomeIcon icon={faCaretSquareLeft} /></Button>
          <Button variant='primary' onClick={this.handleMonthsShow}>From {date.day(1).format('Do MMMM YYYY')} to {date.day(7).format('Do MMMM YYYY')}</Button>
          <Button variant='' onClick={this.handleNextWeek}><FontAwesomeIcon icon={faCaretSquareRight} /></Button>
        </div>

        {this.monthsModal()}
      </div>
    )
  }
}
