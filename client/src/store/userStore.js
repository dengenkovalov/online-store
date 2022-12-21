import {makeAutoObservable} from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isAdmin = false
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
        this._isAuth = user.email !== undefined
        this._isAdmin = user.role === 'ADMIN'
    }

    get isAuth() {
        return this._isAuth
    }

    get isUser() {
        return this._user
    }

    get isAdmin() {
        return this._isAdmin
    }
}
