import {
  observable,
  runInAction,
  autorun
} from 'mobx'

class PrestationStore {
  @observable prestations = []

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

  prestationUpdate (id) {
    runInAction(() => {
      this.prestations.find((prestation) => {
        if (prestation.id === id) {
          prestation.selected = !prestation.selected
        }
      })
    })
  }

  prestationSelected () {
    return this.prestations.filter((prestation) => prestation.selected).length
  }
}

export default new PrestationStore()
