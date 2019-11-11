import { observable, runInAction } from 'mobx';

class ErrorStore {
  @observable errors = 0

  updateErrors () {
    runInAction(() => {
      this.errors = this.errors + 1
      console.log(this.errors)
    })
  }
}

export default new ErrorStore()
