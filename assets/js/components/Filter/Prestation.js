import React, { Component } from 'react'
import '../../../css/prestation.css'
import { observer, inject } from 'mobx-react'
import moment from 'moment'

@inject('prestationStore')
@observer
class Prestation extends Component {
  componentDidMount () {
    this.props.prestationStore.loadPrestations()
  }

  handleClick = (event) => {
    this.props.prestationStore.prestationUpdate(event.target.value)
  }

  render () {
    return (
      <ul>
        {this.props.prestationStore.prestations.map((prestation) => (
          <li
            key={prestation.id}
            onClick={this.handleClick}
            value={prestation.id}
            className={prestation.selected ? 'selected' : ''}
          >
            {prestation.name} ({moment(prestation.timeMaking).format('HH:mm')})
          </li>
        ))}
      </ul>
    )
  }
}

export default Prestation
