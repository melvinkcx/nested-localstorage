import assert from 'assert'
import jsdom from 'mocha-jsdom'
import Store from '../src/store'

describe('Store', () => {
    describe('#_validatePath(path)', () => {
        it('"path.to/a" should be a valid path', () => {
            assert.doesNotThrow(() => {
                Store._validatePath("path.to/a")
            }, TypeError, "TypeError thrown")
        })

        it('"path.to/a" should return a valid path of ["path", "to/a"]', () => {
            assert.deepEqual(
                Store._validatePath(["path", "to/a"]),
                ["path", "to/a"]
            )
        })

        it('"" should be a valid path', () => {
            assert.doesNotThrow(() => {
                Store._validatePath("")
            }, TypeError, "TypeError thrown")
        })

        it('["d.a", "a"] should be a valid path', () => {
            assert.doesNotThrow(() => {
                Store._validatePath(["d.a", "a"])
            }, TypeError, "TypeError thrown")
        })

        it('"["d.a", "a"] should return a valid path of ["d.a", "a"]', () => {
            assert.deepEqual(
                Store._validatePath(["d.a", "a"]),
                ["d.a", "a"]
            )
        })

        it('1234 should be an invalid path', () => {
            assert.throws(() => {
                Store._validatePath(1234)
            }, TypeError, "TypeError not thrown")
        })

        it('{"a":1} should be an invalid path', () => {
            assert.throws(() => {
                Store._validatePath({"a":1})
            }, TypeError, "TypeError not thrown")
        })

        it('["a", "b"] should be a valid path', () => {
            assert.deepEqual(
                Store._validatePath(["a", "b"]),
                ["a", "b"]
            )
        })

        it('"a.b" should be a valid path', () => {
            assert.deepEqual(
                Store._validatePath("a.b"),
                ["a", "b"]
            )
        })
    })

    // describe('#_storeToLocalStorage()', () => {
    //     jsdom()
    //
    //     it('it should dispatch "storeUpdated" event', () => {
    //         // Incomplete
    //     })
    //
    //     it('{"a":1, "b":2, "c":3} should be in localStorage', () => {
    //         localStorage.clear()
    //
    //         Store.setItem("a",1)
    //         Store.setItem("b",2)
    //         Store.setItem("c",3)
    //         assert.deepEqual(
    //             JSON.parse(localStorage.getItem('__store')),
    //             {"a":1, "b":2, "c":3}
    //         )
    //     })
    // })
})