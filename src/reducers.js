import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

function events (state = {events :[], isFetching: null, didInvalidate: false },action){
	switch(action.type){
		case "REQUEST_EVENTS":
			return Object.assign({}, state, {isFetching: action, didInvalidate: false})
		case "RECIEVE_EVENTS_SUCC" :
			return Object.assign({}, state, {isFetching: null, didInvalidate: false, events: action.events, lastUpdated: action.recievedAt})
		case "RECIEVE_EVENTS_ERR" :
			return Object.assign({}, state, {isFetching: null})
		case "REQUEST_ADD_EVENT" :
			return Object.assign({}, state, {isFetching: action, didInvalidate: false}) 
		case "RECIEVE_ADD_EVENT_SUCC" :
		    return Object.assign({}, state, {events: [...state.events, Object.assign({}, action.event)], isFetching: null, didInvalidate: false, lastUpdated: action.recievedAt})
	    case "RECIEVE_ADD_EVENT_ERR" :
	    	return Object.assign({}, state, {isFetching: action, didInvalidate: false}) 
		default: 
			return state
	}
}

function login(state={loggedIn: false, admin:false, isFetching: null, checkedAt: null},action){
	switch(action.type){
		case "REQUEST_LOGIN_INFO":
			return Object.assign({},state, {isFetching: action})
		case "RECIEVE_LOGIN_INFO_SUCC":
			console.log(action)
			return Object.assign({},state, {loggedIn: action.loggedIn, admin: action.admin, isFetching: null, checkedAt: action.recievedAt})
		case "RECIEVE_LOGIN_INFO_ERR":
		return Object.assign({},state, {isFetching: null})
		case "REQUEST_LOGIN":
			return Object.assign({},state, {isFetching: action})
		case "RECIEVE_LOGIN_SUCC":
			return Object.assign({},state, {isFetching: null})
		case "RECIEVE_LOGIN_ERR":
			return Object.assign({},state, {isFetching: null})
		case "REQUEST_LOGOUT":
			return Object.assign({},state, {isFetching: action})
		case "RECIEVE_LOGOUT_SUCC":
			return Object.assign({},state, {isFetching: null, loggedIn: false, admin: false})
		case "RECIEVE_LOGOUT_ERR":
			return Object.assign({},state, {isFetching: null})
		default:
			return state
	}
}

function snackbar(state = {message: 'TEST MESSAGE', opened: false},action){
	switch(action.type){
		case "OPEN_SNACKBAR":
			return {opened: true, message: action.message}
		case "CLOSE_SNACKBAR": 
			return {opened: false, message: state.message}
		default: 
			return state
	}
}

const rootReducer = combineReducers({events: events, snackbar: snackbar, form: formReducer, login: login})

export default rootReducer