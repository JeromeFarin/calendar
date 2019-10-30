import React, { Component } from 'react'
import moment from 'moment'
import '../css/place.css'

class Place extends Component {
  handleMouseEnter (e) {
    if (e.target.className === '') {
      e.target.parentNode.style.zIndex = 100
    }
    e.target.style.zIndex = 100
  }

  handleMouseLeave (e) {
    if (e.target.className === '') {
      e.target.parentNode.style.zIndex = 1
    }
    e.target.style.zIndex = 1
  }

  render () {
    if (parseInt(this.props.type, 10) === 1) {
      return (
        <div
          className='place avalaible'
          style={{
            backgroundColor: `rgb(${this.props.staff.color})`,
            height: `${this.props.size}%`
          }}
          onMouseOver={this.handleMouseEnter}
          onMouseOut={this.handleMouseLeave}
        >
          <span>{moment(this.props.start).format('HH:mm')}</span>
          <span>{moment(this.props.end).format('HH:mm')}</span>
        </div>
      )
    }

    return (
      <div
        className='place unavalaible'
        style={{
          zIndex: 0,
          height: `${this.props.size}%`
        }}
      />
    )
  }
}

export default Place
