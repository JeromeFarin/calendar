import React, { Component } from 'react'
import '../css/staff.css'
import Place from './Place'

class Staff extends Component {
  state = {
    place_count: 1,
    places: []
  }

  componentWillMount () {
    const { ...gStart } = this.props.opened.start
    const { ...gEnd } = this.props.opened.end

    if (this.props.unavailabilities.length > 0) {
      this.props.unavailabilities.forEach((u) => {
        this.state.place_count = this.state.place_count + 1
        if (
          new Date(u.start) < new Date(u.end) &&
          new Date(u.start) < new Date(u.end).setHours(gEnd.hours, gEnd.minutes)
        ) {
          if (
            new Date(u.start) <= new Date(u.start).setHours(gStart.hours, gStart.minutes) &&
            new Date(u.end) >= new Date(u.end).setHours(gEnd.hours, gEnd.minutes)
          ) {
            this.state.places.push({
              id: this.state.place_count,
              type: '0',
              start: new Date(u.start).setHours(gStart.hours, gStart.minutes),
              end: new Date(u.end).setHours(gEnd.hours, gEnd.minutes)
            })
          } else if (
            new Date(u.end) > new Date(u.end).setHours(gStart.hours, gStart.minutes) &&
            new Date(u.start) <= new Date(u.start).setHours(gStart.hours, gStart.minutes)
          ) {
            this.state.places.push({
              id: this.state.place_count,
              type: '0',
              start: new Date(u.start).setHours(gStart.hours, gStart.minutes),
              end: new Date(u.end)
            })
            gStart.hours = new Date(u.end).getHours()
            gStart.minutes = new Date(u.end).getMinutes()
          } else if (
            new Date(u.end) > new Date(u.end).setHours(gStart.hours, gStart.minutes) &&
            new Date(u.start) > new Date(u.start).setHours(gStart.hours, gStart.minutes)
          ) {
            this.state.places.push({
              id: this.state.place_count,
              type: '1',
              start: new Date(u.start).setHours(gStart.hours, gStart.minutes),
              end: new Date(u.start)
            })
            this.state.places.push({
              id: this.state.place_count,
              type: '0',
              start: new Date(u.start),
              end: new Date(u.end)
            })
            gStart.hours = new Date(u.end).getHours()
            gStart.minutes = new Date(u.end).getMinutes()
          }
        }
      })
    }
    this.state.place_count = this.state.place_count + 1
    this.state.places.push({
      id: this.state.place_count,
      type: '1',
      start: new Date(this.props.date).setHours(gStart.hours, gStart.minutes),
      end: new Date(this.props.date).setHours(gEnd.hours, gEnd.minutes)
    })
  }

  getSize (start, end) {
    const gEnd = new Date(end).setHours(this.props.opened.end.hours, this.props.opened.end.minutes)
    const gStart = new Date(start).setHours(this.props.opened.start.hours, this.props.opened.start.minutes)
    const s = new Date(start).getTime()
    const e = new Date(end).getTime()

    return ((e - s) * 100) / (gEnd - gStart)
  }

  render () {
    return (
      <div className='staff' style={{ marginLeft: this.props.left }}>
        {this.state.places.map((place) => (
          <Place
            key={Math.random()}
            size={this.getSize(place.start, place.end)}
            staff={this.props.staff}
            type={place.type}
            start={place.start}
            end={place.end}
          />
        ))}
      </div>
    )
  }
}

export default Staff
