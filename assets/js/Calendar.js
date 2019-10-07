import React from 'react'

export default class Calendar extends React.Component {
  render () {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Westerday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
      </table>
    )
  }
}
