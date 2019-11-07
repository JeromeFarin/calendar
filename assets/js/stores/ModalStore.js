import { observable, runInAction } from 'mobx'

class ModalStore {
  @observable placeModal = false

  @observable monthModal = false

  @observable staffModal = false

  @observable prestationModal = true

  @observable slotId = 0

  @observable places = []

  togglePlaceModal () {
    runInAction(() => {
      this.placeModal = !this.placeModal
    })
  }

  toggleMonthModal () {
    runInAction(() => {
      this.monthModal = !this.monthModal
    })
  }

  toggleStaffModal () {
    runInAction(() => {
      this.staffModal = !this.staffModal
    })
  }

  togglePrestationModal () {
    runInAction(() => {
      this.prestationModal = !this.prestationModal
    })
  }
}

export default new ModalStore()
