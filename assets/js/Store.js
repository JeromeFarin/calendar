import { observable } from 'mobx'

class Store {
    @observable staffs = []

    @observable week = 0

    @observable prestations = []
}

const store = new Store()

export default store
