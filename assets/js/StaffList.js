import React from 'react'
import '../css/staff_list.css'
import { observer } from 'mobx-react'

@observer
class StaffList extends React.Component {
  state = {
    users: []
  }

  componentDidMount () {
    window.fetch('/api/users?page=1', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }))
  }

  componentDidUpdate () {
    this.props.store.staffs = this.state.users.filter((user) => user.selected === true)
  }

  handleClick = (event) => {
    const id = event.target.value

    this.setState((state) => {
      const user = state.users.filter((user) => user.id === id)
      return (user[0].selected = !user[0].selected)
    })
  }

  handleColor (user) {
    if (user.selected) {
      return { backgroundColor: `rgba(${user.color},1)` }
    }
    return { backgroundColor: `rgba(${user.color},0.4)` }
  }

  render () {
    return (
      <ul>
        {this.state.users.map((user) => (
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
        ))}
      </ul>
    )
  }
}

export default StaffList
