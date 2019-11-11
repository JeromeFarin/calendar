import { observable, runInAction, autorun } from 'mobx'
import errorStore from './ErrorStore'

class StaffStore {
  @observable staffs = []

  @observable isSelected = true

  loadStaffs () {
    window.fetch('/api/users?page=1', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        autorun(() => {
          this.staffs = data
        })
      })
      .catch((error) => {
        console.log(error.message)
        errorStore.updateErrors()
      })
  }

  loadSelected () {
    runInAction(() => {
      if (this.staffSelected().length !== this.staffs.length) {
        this.isSelected = false
      } else {
        this.isSelected = true
      }
    })
  }

  staffUpdate (id) {
    runInAction(() => {
      this.staffs.find((staff) => {
        if (staff.id === id) {
          if (staff.selected && this.staffSelected().length > 1) {
            staff.selected = !staff.selected
          } else if (!staff.selected) {
            staff.selected = !staff.selected
          }
        }
      })
    })
  }

  removeAll () {
    runInAction(() => {
      this.staffs.filter((staff) => staff.selected === false).map((staff) => {
        this.staffUpdate(staff.id)
      })
    })
  }

  staffSelected () {
    return this.staffs.filter((staff) => staff.selected)
  }
}

export default new StaffStore()
