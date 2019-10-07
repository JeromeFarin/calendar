import React from 'react'
import Staff from './Staff'
import Date from './Date'
import Prestation from './Prestation'

export default class Filter extends React.Component {
  render () {
    return (
      <div>
        <div id='date'>
          <Date />
        </div>
        <div id='staff'>
          <Staff />
        </div>
        <div id='prestation'>
          <Prestation />
        </div>
      </div>
    )
  }
}
