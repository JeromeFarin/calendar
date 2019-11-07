import {
  observable,
  runInAction,
  autorun
} from 'mobx'
import moment from 'moment'

class PrestationStore {
  @observable prestations = []

  @observable isSelected = false

  loadPrestations () {
    window.fetch('/api/prestations?page=1', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        autorun(() => {
          this.prestations = data
        })
      })
  }

  loadSelected () {
    runInAction(() => {
      if (this.prestations.filter((prestation) => prestation.selected).length > 0) {
        this.isSelected = false
      } else {
        this.isSelected = true
      }
    })
  }

  removeAll () {
    runInAction(() => {
      this.prestations.filter((prestation) => prestation.selected).map((prestation) => {
        this.prestationUpdate(prestation.id)
      })
    })
  }

  prestationUpdate (id) {
    runInAction(() => {
      this.prestations.find((prestation) => {
        if (prestation.id === id) {
          prestation.selected = !prestation.selected
        }
      })
    })
  }

  getTime () {
    let time = 0
    this.prestations.map((prestation) => {
      if (prestation.selected) {
        time = time + (moment(prestation.timeMaking).hour() * 3600000) + (moment(prestation.timeMaking).minute() * 60000)
      }
    })
    return time
  }
}

export default new PrestationStore()
