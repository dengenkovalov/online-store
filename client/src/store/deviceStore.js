import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._basketDevices = []
        this._page = 1
        this._totalCount = 0
        this._totalSum = 0
        this._limit = 4
        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    setTypes(types) {
        this.setPage(1)
        this._types = types
    }

    setBrands(brands) {
        this.setPage(1)
        this._brands = brands
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    setDevices(devices) {
        this._devices = devices
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setTotalSum(sum) {
        this._totalSum = sum
    }

    setBasketDevices(devices) {
        this._basketDevices = devices
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }

    get devices() {
        return this._devices
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }

    get basketDevices() {
        return this._basketDevices
    }

    get totalSum() {
        return this._totalSum
    }
}
