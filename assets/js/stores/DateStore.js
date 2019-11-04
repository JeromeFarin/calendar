import { observable, runInAction, autorun } from 'mobx'
import moment from 'moment'

class DateStore {
    @observable date = moment()

    @observable days = []

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

    getDays () {
      autorun(() => {
        for (let i = 1; i < 7; i += 1) {
          this.days = this.date.day(i)
        }
      })
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
