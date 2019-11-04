import { observable, runInAction } from 'mobx'
import moment from 'moment'

class DateStore {
    @observable date = moment()

    @observable opened = {
      start: {
        hours: '09',
        minutes: '00'
      },
      end: {
        hours: '16',
        minutes: '00'
      }
    }

    addWeek () {
      runInAction(() => {
        this.date = moment().week(this.date.week() + 1)
      })
    }

    removeWeek () {
      runInAction(() => {
        this.date = moment().week(this.date.week() - 1)
      })
    }

    selectMonth (month) {
      this.date = moment().month(month)
    }
}

export default new DateStore()
