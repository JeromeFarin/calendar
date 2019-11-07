import { observable, runInAction, autorun } from 'mobx'

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
  }

  loadSelected () {
    runInAction(() => {
      if (this.staffs.filter((staff) => staff.selected).length !== this.staffs.length) {
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
          staff.selected = !staff.selected
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
