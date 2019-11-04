import {
  observable,
  runInAction,
  autorun
} from 'mobx'

class StaffStore {
  @observable staffs = []

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
  }

  staffUpdate (id) {
    runInAction(() => {
      this.staffs.find((staff) => {
        if (staff.id === id) {
          staff.selected = !staff.selected
        }
      })
    })
  }

  staffSelected () {
    return this.staffs.filter((staff) => staff.selected)
  }
}

export default new StaffStore()
