import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import '../../../css/date.css'
import { observer, inject } from 'mobx-react'

@inject('dateStore', 'modalStore')
@observer
class Date extends Component {
  handleModal = () => {
    this.props.modalStore.toggleMonthModal()
  }

  handleNextWeek = () => {
    this.props.dateStore.addWeek()
  }

  handlePreviousWeek = () => {
    this.props.dateStore.removeWeek()
  }

  render () {
    return (
      <div>
        <div>
          <Button variant='' onClick={this.handlePreviousWeek}><FontAwesomeIcon icon={faCaretSquareLeft} /></Button>
          <Button
            variant='primary'
            onClick={this.handleModal}
          >
            {this.props.dateStore.date.format('MMMM')} week {this.props.dateStore.date.week()}
          </Button>
          <Button variant='' onClick={this.handleNextWeek}><FontAwesomeIcon icon={faCaretSquareRight} /></Button>
        </div>
      </div>
    )
  }
}

export default Date
