import { observable, runInAction } from 'mobx'
import moment from 'moment'
import slotStore from './SlotStore'
import prestationStore from './PrestationStore'

class ModalStore {
  @observable placeModal = false

  @observable monthModal = false

  @observable staffModal = false

  @observable prestationModal = false // true

  @observable slotId = 0

  @observable staffWay = true

  @observable places = []

  togglePlaceModal () {
    runInAction(() => {
      this.loadPlaces()
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

  loadPlaces () {
    const { ...slot } = slotStore.getSlot(this.slotId)
    const availableTime = moment(slot.end).valueOf() - prestationStore.getTime()
    this.places = []

    for (let i = moment(slot.start).valueOf(); i < availableTime; i += 300000) {
      this.places.push({
        id: i,
        start: moment(i),
        end: moment(i + prestationStore.getTime()),
        staff: slot.staff
      })
    }
  }
}

export default new ModalStore()
