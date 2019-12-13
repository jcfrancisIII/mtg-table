import { combineReducers } from 'redux'

import helloWorld from './helloWorld'
import hosts from './hosts'

export default combineReducers({ helloWorld, hosts })
