import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'
import moment from 'moment';

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
	    case "REQUEST_EDIT_EVENT" :
			return Object.assign({}, state, {isFetching: action, didInvalidate: false}) 
		case "RECIEVE_EDIT_EVENT_SUCC" :
		    return Object.assign({}, state, {events: [...state.events.filter((evt)=>{action.event.id !== evt.id}), Object.assign({}, action.event)], isFetching: null, didInvalidate: false, lastUpdated: action.recievedAt})
	    case "RECIEVE_EDIT_EVENT_ERR" :
	    	return Object.assign({}, state, {isFetching: action, didInvalidate: false}) 
    	case "REQUEST_DELETE_EVENT" :
			return Object.assign({}, state, {isFetching: action, didInvalidate: false}) 
		case "RECIEVE_DELETE_EVENT_SUCC" :
		    return Object.assign({}, state, {events: [...state.events.filter((evt)=>{action.event.id !== evt.id})], isFetching: null, didInvalidate: false, lastUpdated: action.recievedAt})
	    case "RECIEVE_DELETE_EVENT_ERR" :
	    	return Object.assign({}, state, {isFetching: action, didInvalidate: false})
    	case "REQUEST_COPY_EVENT" :
			return Object.assign({}, state, {isFetching: action, didInvalidate: false}) 
		case "RECIEVE_COPY_EVENT_SUCC" :
		    return Object.assign({}, state, {events: [...state.events, Object.assign({}, action.event)], isFetching: null, didInvalidate: false, lastUpdated: action.recievedAt})
	    case "RECIEVE_COPY_EVENT_ERR" :
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

function table(state={forceUpdate: false, filterFrom: moment().startOf('month').toDate(), filterTo: moment().endOf('month').toDate(), filterString: ""},action){
	switch(action.type){
		case "FORCE_UPDATE":
			return Object.assign({}, state, {forceUpdate: action.bool})
		case "CHANGE_FILTER_FROM":
			return Object.assign({}, state, {filterFrom: action.dateFrom})
		case "CHANGE_FILTER_TO":
			return Object.assign({}, state, {filterTo: action.dateTo})
		case "CHANGE_FILTER_BOTH":
			return Object.assign({}, state, {filterTo: action.dateTo, filterFrom: action.dateFrom})
		case "CHANGE_FILTER_STRING":
			return Object.assign({}, state, {filterString: action.string})
		default: return state
	}
}

function code(state={code: "", isFetching: null},action){
	switch(action.type){
		case "REQUEST_CODE":
			return Object.assign({}, state, {isFetching: action})
		case "RECIEVE_CODE_SUCC":
			return Object.assign({}, state, {code: action.code.trim(), isFetching: null})
		case "RECIEVE_CODE_ERR":
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

const rootReducer = combineReducers({events: events, snackbar: snackbar, form: formReducer, login: login, table: table, code: code})

export default rootReducer