import { RECEIVE_HELLO_WORLD } from '../actions/index'

export default (state = '', { type, text }) => {
    switch (type) {
        case RECEIVE_HELLO_WORLD:
            return text
        default:
            return state
    }
}
