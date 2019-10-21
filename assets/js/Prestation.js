import React from 'react'
import '../css/prestation.css'

export default class Prestation extends React.Component {
  state = {
    prestations: []
  }

  componentDidMount () {
    window.fetch('/api/prestations?page=1', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => this.setState({ prestations: data }))
  }

  componentDidUpdate () {
    this.props.store.prestations = this.state.prestations.filter((prestation) => prestation.selected === true)
  }

  handleClick = (event) => {
    const id = event.target.value

    this.setState((state) => {
      const prestation = state.prestations.filter((prestation) => prestation.id === id)
      return (prestation[0].selected = !prestation[0].selected)
    })
  }

  handleColor (prestation) {
    if (prestation.selected) {
      return { backgroundColor: `rgba(${prestation.color},1)` }
    }
    return { backgroundColor: `rgba(${prestation.color},0.4)` }
  }

  render () {
    return (
      <ul>
        {this.state.prestations.map((prestation) => (
          <li
            key={prestation.id}
            style={this.handleColor(prestation)}
            onClick={this.handleClick}
            value={prestation.id}
            data-selected={prestation.selected}
            className={prestation.selected ? 'selected' : ''}
          >
            {prestation.name}
          </li>
        ))}
      </ul>
    )
  }
}