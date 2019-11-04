import { observable, autorun, observe } from 'mobx'
import moment from 'moment'
import dateStore from './DateStore'
import staffStore from './StaffStore'
import prestationStore from './PrestationStore'
import unavailabilityStore from './UnavailabilityStore'

class PlaceStore {
  @observable places = []

  @observable placesId = 0

  loaded = false

  getTime () {
    let time = 0
    prestationStore.prestations.map((prestation) => {
      if (prestation.selected) {
        time = time + (moment(prestation.timeMaking).hour() * 3600000) + (moment(prestation.timeMaking).minute() * 60000)
      }
    })
    return time
  }

  addPlace (type, staff, day, start, end) {
    const time = this.getTime()
    const size = this.getSize(start, end)
    if (parseInt(type, 10) === 1) {
      if (time <= (moment(end).valueOf() - moment(start).valueOf())) {
        this.places.push({
          type,
          staff,
          day,
          start,
          end,
          size
        })
      }
    }
  }

  getSize (start, end) {
    const { ...gStart } = dateStore.opened.start
    const { ...gEnd } = dateStore.opened.end

    return ((moment(end).valueOf() - moment(start).valueOf()) * 100) / (moment(end).hour(gEnd.hours).minute(gEnd.minutes).valueOf() - moment(start).hour(gStart.hours).minute(gStart.minutes).valueOf())
  }

  loadPlaces () {
    autorun(() => {
      observe(unavailabilityStore, () => {
        this.places = []

        for (let d = 1; d < 7; d += 1) {
          const { ...day } = dateStore.date.day(d)
          const { ...gEnd } = dateStore.opened.end
          const { ...gStart } = dateStore.opened.start
          staffStore.staffSelected().map((staff) => {
            const gEndFormat = moment(day).hour(gEnd.hours).minute(gEnd.minutes).format()
            let gStartFormat = moment(day).hour(gStart.hours).minute(gStart.minutes).format()
            // if no unavailabilities set staff available for all at day
            if (unavailabilityStore.unavailabilities.length > 0) {
              // start unavailabilities loop for staff
              unavailabilityStore.unavailabilities.filter((unavailability) => unavailability.staff === `/api/users/${staff.id}`).map((unavailability) => {
                // check if unavailability start < end && gStart = gEnd
                if (moment(unavailability.start).format() < moment(unavailability.end).format()) {
                  // unavailability start <= gStart && unavailability end > gStart
                  if (moment(unavailability.start).format() <= gStartFormat && moment(unavailability.end).format() > gStartFormat) {
                    // unavailability end > gEnd
                    if (moment(unavailability.end).format() >= gEndFormat) {
                      this.addPlace('0', staff, d, gStartFormat, gEndFormat)
                      gStartFormat = gEndFormat
                    } else {
                      this.addPlace('0', staff, d, gStartFormat, moment(unavailability.end).format())
                      gStartFormat = moment(unavailability.end).format()
                    }
                  // gStart < gEnd && unavailability end > gStart
                  } else if (gStartFormat < gEndFormat && moment(unavailability.end).format() > gStartFormat) {
                    // unavailability start > gEnd
                    if (moment(unavailability.start).format() > gEndFormat) {
                      this.addPlace('1', staff, d, gStartFormat, gEndFormat)
                      gStartFormat = gEndFormat
                    } else {
                      this.addPlace('1', staff, d, gStartFormat, moment(unavailability.start).format())
                      gStartFormat = moment(unavailability.start).format()
                    }
                    // unavailability end > gEnd
                    if (gStartFormat < gEndFormat) {
                      if (moment(unavailability.end).format() > gEndFormat) {
                        this.addPlace('0', staff, d, moment(unavailability.start).format(), gEndFormat)
                        gStartFormat = gEndFormat
                      } else {
                        this.addPlace('0', staff, d, moment(unavailability.start).format(), moment(unavailability.end).format())
                        gStartFormat = moment(unavailability.end).format()
                      }
                    }
                  }
                }
              })
            }

            if (gStartFormat !== gEndFormat) {
              this.addPlace('1', staff, d, gStartFormat, gEndFormat)
              gStartFormat = gEndFormat
            }
          })
        }
      })
    })
  }
}

export default new PlaceStore()
