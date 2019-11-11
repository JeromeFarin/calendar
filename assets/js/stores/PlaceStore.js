import { observable, runInAction } from 'mobx'
import moment from 'moment'
import slotStore from './SlotStore'
import prestationStore from './PrestationStore'

class PlaceStore {
  @observable place = []

  @observable places = []

  @observable slotId = 0

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

  setPlace (id) {
    runInAction(() => {
      this.place = this.places.find((place) => parseInt(place.id, 10) === parseInt(id, 10))
    })
  }
}

export default new PlaceStore()
