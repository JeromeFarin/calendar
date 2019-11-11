import { observable, runInAction } from 'mobx';

class ErrorStore {
  @observable errors = 0

  updateErrors () {
    runInAction(() => {
      this.errors = this.errors + 1
    })
  }
}

export default new ErrorStore()
