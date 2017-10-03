import { model, init, dispatch } from '../src/index'
import { _store } from '../src/store'

beforeEach(() => {
  jest.resetModules()
})

describe('dispatch:', () => {
  test('should dispatch an action', () => {
    init({ view: () => () => {} })

    model({
      name: 'count',
      state: 0,
      reduce: {
        add: state => state + 1,
      },
    })

    dispatch.count.add()

    expect(_store.getState()).toEqual({
      count: 1,
    })
  })

  test('should dispatch multiple actions', () => {
    init({ view: () => () => {} })

    model({
      name: 'count',
      state: 0,
      reduce: {
        add: state => state + 1,
      },
    })

    dispatch.count.add()
    dispatch.count.add()

    expect(_store.getState()).toEqual({
      count: 2,
    })
  })

  test('should handle multiple models', () => {
    init({ view: () => () => {} })

    model({
      name: 'a',
      state: 42,
      reduce: {
        add: state => state + 1,
      },
    })

    model({
      name: 'b',
      state: 0,
      reduce: {
        add: state => state + 1,
      },
    })

    dispatch.a.add()
    dispatch.b.add()

    expect(_store.getState()).toEqual({
      a: 43,
      b: 1,
    })
  })

  it('should be called from an dispatch action type', () => {
    init()

    model({
      name: 'count',
      state: 0,
      reduce: {
        add: state => state + 1,
      },
    })

    _store.dispatch({ type: 'count/add' })

    expect(_store.getState()).toEqual({
      count: 1,
    })
  })

  test('should handle state as the first param', () => {
    init()

    model({
      name: 'count',
      state: 0,
      effect: {
        doNothing: state => state,
      },
    })

    action.count.doNothing()

    expect(_store.getState()).toEqual({
      count: 0,
    })
  })

  test('should handle payload as the second param', () => {
    init()

    model({
      name: 'count',
      state: 1,
      effect: {
        incrementBy: (state, payload) => state + payload,
      },
    })

    action.count.incrementBy(5)

    expect(_store.getState()).toEqual({
      count: 6,
    })
  })
})
