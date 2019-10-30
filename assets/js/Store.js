import { observable } from 'mobx'

class Store {
    @observable staffs = []

    @observable week = 0

    @observable year = 0

    @observable prestations = []

    @observable unavailables = []
}

const store = new Store()

export default store
