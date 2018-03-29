/**
 * nested-localstorage
 * nested-localstorage is a wrapper of localStorage that maintain single data store across multiple instances
 * This allow single source of data among multiple frameworks, multiple tabs, etc similar to localStorage
 * Since the underlying data store is localStorage, all constraints of localStorage apply.
 * The purpose of this class is to allow creation and retrieval of nested object
 * and will not throw any exception when an invalid nested property is accessed
 *
 * Caveat:
 * This class assumes localStorage is not tampered other than using this Store class,
 * it does not check against external changes of localStorage
 *
 * First created on 13 Jan, 2017
 * Contributors: Melvin Koh <melvinkcx@gmail.com>
 *
 */


/**
 * Store class
 */
const STORE = '__store'

class Store {
    constructor () {
        Store.store = JSON.parse(localStorage.getItem(STORE)) || {}
    }

    /**
     * _validatePath
     * @param path: A String of path using dot separator or an Array of path
     */
    static _validatePath (path) {
        if (typeof path === 'string') {
            path = path.split('.')
        }

        if (!(path instanceof Array)) {
            throw TypeError('Path is invalid')
        }

        return path
    }

    /**
     * _createPath function creates nested object given a 'path'
     * @param obj
     * @param path: A String of path using dot separator or an Array of path
     * @param value
     * @returns {*}
     */
    static _createPath (obj, path, value) {
        const assignValue = arguments.length === 3 ? path.pop() : false

        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]] = obj[path[i]] || {}
        }

        if (value === undefined || value === null) {
            value = {}
        }

        if (assignValue) {
            obj = obj[assignValue] = value
        }

        return obj
    }

    static _goToPath (obj, path) {
        for (let i = 0; i < path.length; i++) {
            if (obj[path[i]]) {
                obj = obj[path[i]]
            } else {
                return undefined
            }
        }

        return obj
    }

    static _storeToLocalStorage () {
        localStorage.setItem(STORE, JSON.stringify(Store.store))
        window.dispatchEvent(new Event('storeUpdated'))
    }

    /**
     * Store key value pair
     * @param path: A String of path using dot separator or an Array of path
     * @param value
     * Note:
     * if value is not supplied, an empty Object will be used
     */
    static setItem (path, value) {
        path = Store._validatePath(path)

        const lastValue = (value !== undefined || value !== null) ? Store._createPath(Store.store, path, value) : Store._createPath(Store.store, path)

        Store._storeToLocalStorage()

        return lastValue
    }

    /**
     * getItem
     * @param path: A String of path separated by dot, or an Array of path
     * @returns {*}
     * Note:
     * if path is not supplied, the entire Store.store will be returned
     */
    static getItem (path) {
        if (!path) {
            return Store.store
        }

        path = Store._validatePath(path)

        return Store._goToPath(Store.store, path)
    }

    /**
     * appendItem
     * @param path: A String of path separated by dot, or an Array of path
     * Note:
     * Exception will be thrown if value is null
     * This will create an Array on single element if the value of a path is undefined
     */
    static appendItem (path, value) {
        path = Store._validatePath(path)

        if (arguments.length === 1) {
            throw TypeError('Missing second positional argument: value')
        }

        if (!Store.getItem(path)) {
            return Store.setItem(path, [value])
        }

        let temp = Store.getItem(path)

        if (!(temp instanceof Array)) {
            return Store.setItem(path, [temp, value])
        } else {
            temp = temp.concat(value)
            return Store.setItem(path, temp)
        }
    }
}

new Store() // for side-effect

export default Store
