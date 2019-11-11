import {
  observable,
  autorun
} from 'mobx'
import dateStore from './DateStore'
import errorStore from './ErrorStore'

class UnavailabilityStore {
  @observable unavailabilities = []

  loadUnavailabilities () {
    autorun(() => {
      window.fetch('/unavailabilities', {
        method: 'POST',
        body: JSON.stringify({
          start: dateStore.date.day(1).startOf('day').format(),
          end: dateStore.date.day(6).endOf('day').format()
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          autorun(() => {
            this.unavailabilities = data
          })
        })
        .catch((error) => {
          console.log(error.message)
          errorStore.updateErrors()
        })
    })
  }
}

export default new UnavailabilityStore()
