import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import '../css/calendar.css'

@observer
class Calendar extends React.Component {
  handleDay (day) {
    console.log(day)

    return (
      <td>
        {this.props.store.staffs.map((staff, i) => (
          <div
            key={staff.id}
            style={{ marginLeft: `${i}0px`, backgroundColor: `rgba(${staff.color},1)` }}
            onClick={this.handleClick}
            className='staff'
          >
            {staff.pseudo}
          </div>
        ))}
      </td>
    )
  }

  handleClick (event) {
    console.log(event.target)
  }

  render () {
    const date = moment().week(this.props.store.week)

    return (
      <div>
        <h4>Result for week : {date.week()} staffs : {this.props.store.staffs.length} and prestation : {this.props.store.prestations.length}</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>{date.day(1).format('dddd Do')}</th>
              <th>{date.day(2).format('dddd Do')}</th>
              <th>{date.day(3).format('dddd Do')}</th>
              <th>{date.day(4).format('dddd Do')}</th>
              <th>{date.day(5).format('dddd Do')}</th>
              <th>{date.day(6).format('dddd Do')}</th>
              <th>{date.day(7).format('dddd Do')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.handleDay(date.day(1))}
              {this.handleDay(date.day(2))}
              {this.handleDay(date.day(3))}
              {this.handleDay(date.day(4))}
              {this.handleDay(date.day(5))}
              {this.handleDay(date.day(6))}
              {this.handleDay(date.day(7))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Calendar
