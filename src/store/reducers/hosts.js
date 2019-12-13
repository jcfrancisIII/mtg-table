export default function counter(state = 0, action) {
    switch (action.type) {
        case 'HOSTS_SUCCEEDED': {
            /*
        when the reducer get's the action you triggered in the saga,
        you can store the response in the state and later on select it in the react component you need it in
      */
            console.log(action)
            return { ...state, response: action.payload }
        }
        default:
            return state
    }
}
