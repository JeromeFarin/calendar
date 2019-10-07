import React from 'react'
import '../css/staff.css'

export default class Staff extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    fetch('https://localhost:8000/api/users?page=1', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ users: data }))
  }

  handleClick = (event) => {
    const id = event.target.value
      
    this.setState(state => {
        const user = state.users.filter(user => user.id === id)
        return user[0].selected = !user[0].selected
    })
  }

  handleColor(user) {
      if (user.selected) {
          return { backgroundColor: 'rgba(' + user.color + ',1)' }
      } else {
          return { backgroundColor: 'rgba(' + user.color + ',0.4)' }
      }
  }

  render () {
    return (
      <ul>
        {this.state.users.map((user) =>
          <li
            key={user.id}
            style={this.handleColor(user)}
            onClick={this.handleClick}
            value={user.id}
            data-selected={user.selected}
            className={user.selected ? 'selected' : ''}
          >
            {user.pseudo}
          </li>
        )}
      </ul>
    )
  }
}
