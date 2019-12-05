import { put, takeLatest } from 'redux-saga/effects'

import { REQUEST_HELLO_WORLD, receiveHelloWorld } from './actions'

function* helloWorld(action) {
    try {
        // do api call
        yield put(receiveHelloWorld('Hellowwwwww from the redux saga'))
    } catch (e) {
        yield put(receiveHelloWorld('err Hellowwwwww from the redux saga'))
    }
}

export default function* mySaga() {
    yield takeLatest(REQUEST_HELLO_WORLD, helloWorld)
}
