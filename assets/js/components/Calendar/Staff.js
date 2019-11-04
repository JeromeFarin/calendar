import React, { Component } from 'react'
import '../../../css/staff.css'
import { observer, inject } from 'mobx-react'
import Place from './Place'

@inject('placeStore')
@observer
class Staff extends Component {
  render () {
    return (
      <div className='staff' style={{ marginLeft: this.props.left }}>
        {this.props.placeStore.places.filter((place) => place.staff.id === this.props.staff.id && place.day === this.props.day).map((place) => (
          <Place
            key={Math.random()}
            type={place.type}
            staff={place.staff}
            size={place.size}
            start={place.start}
            end={place.end}
          />
        ))}
      </div>
    )
  }
}

export default Staff
