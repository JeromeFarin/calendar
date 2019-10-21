import React from 'react'
import Staff from './Staff'
import Date from './Date'
import Prestation from './Prestation'

export default class Filter extends React.Component {
  render () {
    return (
      <div>
        <div id='date'>
          <Date store={this.props.store} />
        </div>
        <div id='staff'>
          <Staff store={this.props.store} />
        </div>
        <div id='prestation'>
          <Prestation store={this.props.store} />
        </div>
      </div>
    )
  }
}
