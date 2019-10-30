import React, { Component } from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'
import Day from './Day'

@observer
class Calendar extends Component {
  state = {
    unavailabilities: []
  }

  componentDidMount () {
    window.fetch('/api/unavailabilities?page=1', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => this.setState({ unavailabilities: data }))
  }

  render () {
    const date = moment().week(this.props.store.week)
    const ths = []
    const tds = []

    for (let d = 1; d < 7; d += 1) {
      ths.push(date.day(d).format('dddd Do'))
      tds.push(
        <Day
          date={date.day(d)}
          staffs={this.props.store.staffs}
          unavailabilities={this.state.unavailabilities.filter((unavailability) => (
            new Date(unavailability.start).setHours(0, 0, 0, 0) >= new Date(date.day(d).toDate()).setHours(0, 0, 0, 0) &&
            new Date(unavailability.start).setHours(0, 0, 0, 0) <= new Date(date.day(d).toDate()).setHours(23, 59, 59, 0) &&
            new Date(unavailability.end).setHours(0, 0, 0, 0) >= new Date(date.day(d).toDate()).setHours(0, 0, 0, 0) &&
            new Date(unavailability.end).setHours(0, 0, 0, 0) <= new Date(date.day(d).toDate()).setHours(23, 59, 59, 0)
          ))}
        />
      )
    }

    return (
      <div>
        <h4>Result for week : {date.week()} staffs : {this.props.store.staffs.length} and prestation : {this.props.store.prestations.length}</h4>
        <table className='table'>
          <thead>
            <tr>
              {ths.map((th) => <th key={Math.random()}>{th}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tds.map((td) => <td key={Math.random()}>{td}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Calendar
