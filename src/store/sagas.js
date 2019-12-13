import { put, takeLatest, all } from 'redux-saga/effects'

import { REQUEST_HELLO_WORLD, receiveHelloWorld } from './actions'

function* helloWorld(action) {
    try {
        // do api call
        yield put(receiveHelloWorld('Hellowwwwww from the redux saga'))
    } catch (e) {
        yield put(receiveHelloWorld('err Hellowwwwww from the redux saga'))
    }
}

function* fetchHosts(dispatch) {
    try {
        // do api call
        const data = [
            {
                hostName: 'SRV1234',
                dbs: [{ dbName: 'DB1234' }, { dbName: 'DB1235' }]
            },
            {
                hostName: 'SRV5678',
                dbs: [{ dbName: 'DB5678' }, { dbName: 'DB5679' }]
            }
        ]
        yield put({ type: 'HOSTS_SUCCEEDED', payload: data })
    } catch (e) {
        // some error code
    }
}

export function* watchAll() {
    yield all([
        yield takeLatest('SHOW', fetchHosts),
        yield takeLatest(REQUEST_HELLO_WORLD, helloWorld)
    ])
}
