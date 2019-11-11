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

  selectedPrestations () {
    return this.prestations.filter((prestation) => prestation.selected)
  }

  loadSelected () {
    runInAction(() => {
      if (this.selectedPrestations().length > 0) {
        this.isSelected = false
      } else {
        this.isSelected = true
      }
    })
  }

  removeAll () {
    runInAction(() => {
      this.selectedPrestations().map((prestation) => {
        this.prestationUpdate(prestation.id)
      })
    })
  }

  prestationUpdate (id) {
    runInAction(() => {
      this.prestations.find((prestation) => {
        if (prestation.id === id) {
          if (prestation.selected && this.selectedPrestations().length > 1) {
            prestation.selected = !prestation.selected
          } else if (!prestation.selected) {
            prestation.selected = !prestation.selected
          }
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
