import moment from 'moment';

export function requestAddEvent(event){
	return {
		type: "REQUEST_ADD_EVENT",
		event
	}
}

export function recieveAddEventSucc(json){
	return {
		type: "RECIEVE_ADD_EVENT",
		event: json,
		recievedAt: Date.now()	
	}
}

export function recieveAddEventErr(){
	return {
		type: "RECIEVE_ADD_EVENT_ERR",
	}
}

export function requestEditEvent(event){
	return {
		type: "REQUEST_EDIT_EVENT",
		event
	}
}

export function recieveEditEventSucc(json){
	return {
		type: "RECIEVE_EDIT_EVENT_SUCC",
		event: json,
		recievedAt: Date.now()	
	}
}

export function recieveEditEventErr(){
	return {
		type: "RECIEVE_EDIT_EVENT_ERR",
	}
}

export function requestDeleteEvent(event){
	return {
		type: "REQUEST_DELETE_EVENT",
		event
	}
}

export function recieveDeleteEventSucc(event){
	return {
		type: "RECIEVE_DELETE_EVENT_SUCC",
		recievedAt: Date.now(),
		event	
	}
}

export function recieveDeleteEventErr(){
	return {
		type: "RECIEVE_DELETE_EVENT_ERR",
	}
}

export function requestCopyEvent(event){
	return {
		type: "REQUEST_COPY_EVENT",
		event
	}
}

export function recieveCopyEventSucc(event){
	return {
		type: "RECIEVE_COPY_EVENT_SUCC",
		recievedAt: Date.now(),
		event	
	}
}

export function recieveCopyEventErr(){
	return {
		type: "RECIEVE_COPY_EVENT_ERR",
	}
}



export function selectEvent(event){
	return {
		type: "SELECT_EVENT",
		event
	}
}

function requestEvents(){
	return {type: "REQUEST_EVENTS"}
}

function recieveEventsSucc(json){
	return {type: "RECIEVE_EVENTS_SUCC",
			events: json,
			recievedAt: Date.now()	
	}
}

function recieveEventsErr(){
	return {type: "RECIEVE_EVENTS_ERR"
	}
}

function requestCode(){
	return {type: "REQUEST_CODE"}
}

function recieveCodeSucc(data){
	return {type: "RECIEVE_CODE_SUCC",
			code: data,
			recievedAt: Date.now()	
	}
}

function recieveCodeErr(){
	return {type: "RECIEVE_CODE_ERR"
	}
}

export function changeTableFilterDateFrom(date){
	return {type: "CHANGE_FILTER_FROM", dateFrom: date}
}

export function changeTableFilterDateTo(date){
	return {type: "CHANGE_FILTER_TO", dateTo: date}
}

export function changeTableFilterDateBoth(dateFrom, dateTo){
	return {type: "CHANGE_FILTER_BOTH", dateFrom: dateFrom, dateTo: dateTo}
}

export function changeTableFilterString(string){
	return {type: "CHANGE_FILTER_STRING", string: string}
}

export function eventPostAction(event, requestAction , responseActionSucc, responseActionErr, postActionString){
	let date = moment(event.date).format('YYYY-MM-DD')
    let time = moment(event.time).format('HH:MM')
    let time_preparation = moment(event.time_preparation).format('HH:MM')
    event = Object.assign({}, event, {date: date, time: time, time_preparation: time_preparation, action: postActionString})
	return dispatch => {
		dispatch(requestAction(event))
		var form_data =  Object.getOwnPropertyNames(event).map(function(k) { return [k, event[k]].join('=') }).join('&')
		return fetch('/trojkaset/scheduler.php',{method: 'POST', credentials: 'include', body: form_data, headers: {'content-type': 'application/x-www-form-urlencoded'}})
		.then(
            response => response.text(),
			error => dispatch(responseActionErr())
		)
		.then(
			data => dispatch(responseActionSucc(data)),
		)
	}
}

export function copyEvent(event){
	return eventPostAction(event, requestCopyEvent, recieveCopyEventSucc, recieveCopyEventErr, 'copy')
}

export function addEvent(event){
	let date = moment(event.date).format('YYYY-MM-DD')
    let time = moment(event.time).format('HH:MM')
    let time_preparation = moment(event.time_preparation).format('HH:MM')
    event = Object.assign({}, event, {date: date, time: time, time_preparation: time_preparation, action: 'create'})
	return dispatch => {
		dispatch(requestAddEvent(event))
		var form_data =  Object.getOwnPropertyNames(event).map(function(k) { return [k, event[k]].join('=') }).join('&')
		return fetch('/trojkaset/scheduler.php',{method: 'POST', credentials: 'include', body: form_data, headers: {'content-type': 'application/x-www-form-urlencoded'}})
		.then(
            response => response.text(),
			error => dispatch(recieveAddEventErr())
		)
		.then(
			data => dispatch(recieveAddEventSucc(data)),
		)
	}


}

export function editEvent(event){
	let date = moment(event.date).format('YYYY-MM-DD')
    let time = moment(event.time).format('HH:MM')
    let time_preparation = moment(event.time_preparation).format('HH:MM')
    event = Object.assign({}, event, {date: date, time: time, time_preparation: time_preparation, action: 'update'})
	return dispatch => {
		dispatch(requestEditEvent(event))
		var form_data =  Object.getOwnPropertyNames(event).map(function(k) { return [k, event[k]].join('=') }).join('&')
		return fetch('/trojkaset/scheduler.php',{method: 'POST', credentials: 'include', body: form_data, headers: {'content-type': 'application/x-www-form-urlencoded'}})
		.then(
            response => response.text(),
			error => dispatch(recieveEditEventErr())
		)
		.then(
			data => dispatch(recieveEditEventSucc(data)),
		)
	}


}

export function deleteEvent(event){
	let date = moment(event.date).format('YYYY-MM-DD')
    let time = moment(event.time).format('HH:MM')
    let time_preparation = moment(event.time_preparation).format('HH:MM')
    event = Object.assign({}, event, {date: date, time: time, time_preparation: time_preparation, action: 'delete'})
	return dispatch => {
		dispatch(requestDeleteEvent(event))
		var form_data =  Object.getOwnPropertyNames(event).map(function(k) { return [k, event[k]].join('=') }).join('&')
		return fetch('/trojkaset/scheduler.php',{method: 'POST', credentials: 'include', body: form_data, headers: {'content-type': 'application/x-www-form-urlencoded'}})
		.then(
            response => response.text(),
			error => dispatch(recieveDeleteEventErr())
		)
		.then(
			data => dispatch(recieveDeleteEventSucc(event)),
		)
	}
}

export function fetchEvents(lock = null){
	let string = '/trojkaset/scheduler.php?action=get_calendar'
	if(lock){
		string = '/trojkaset/scheduler.php?lock=' + lock 
	}
	return dispatch => {
		dispatch(requestEvents())
		return fetch(string)
		.then(
            response => response.json(),
			error => dispatch(recieveEventsErr())
		)
		.then(
			data => dispatch(recieveEventsSucc(data))
		)
	}
}

export function fetchCode(){
	return dispatch => {
		dispatch(requestCode())
		return fetch('/trojkaset/scheduler.php?action=get_code',{credentials: 'include'})
		.then(
            response => response.text(),
			error => dispatch(recieveCodeErr())
		)
		.then(
			data => dispatch(recieveCodeSucc(data))
		)
	}
}

export function fetchEventsAdmin(){
	return dispatch => {
		dispatch(requestEvents())
		return fetch('/trojkaset/scheduler.php?action=get_admin',{credentials: 'include'})
		.then(
            response => response.json(),
			error => dispatch(recieveEventsErr())
		)
		.then(
			data => dispatch(recieveEventsSucc(data))
		)
	}
}

export function requestLoginInfo(){
	return {
		type: "REQUEST_LOGIN_INFO"
	}
}

export function recieveLoginInfoSucc(info){
	return {
		type: "RECIEVE_LOGIN_INFO_SUCC",
		loggedIn: info.loggedIn,
		admin: info.admin,
		recievedAt: Date.now()	
	}
}

export function recieveLoginInfoErr(){
	return {type: "RECIEVE_LOGIN_INFO_ERR"}
}

export function checkLogin(){
	return dispatch => {
		dispatch(requestLoginInfo())
		return fetch('/trojkaset/scheduler.php?action=get_is_loged',{credentials: 'include'})
		.then(handleErrors)
		.then(
            response => response.text(),
			error => {dispatch(recieveLoginInfoErr()); throw error}
		)
		.then(
			data => {
				if(data && data.trim() === "0"){
					dispatch(recieveLoginInfoSucc({loggedIn: false, admin: false}))
				}else if(data && data.trim() === "admin"){
					dispatch(recieveLoginInfoSucc({loggedIn: true, admin: true}))
				}else if(data && data.trim() === "guest"){
					dispatch(recieveLoginInfoSucc({loggedIn: true, admin: false}))
				}
			},
		)
	}
}

export function checkLoginAndLoadCode(){
 return (dispatch, getState) => {
    return dispatch(checkLogin()).then(() => {
      const isAdmin = getState().login.admin
      if(isAdmin){
      	return dispatch(fetchCode())
      }else{
      	return null
      }
    })
  }

}

function handleErrors(response) {
    if (!response.ok) {
    	let e = Error(response.statusText)
    	e.name = "ServerError"
        throw e
    }
    return response;
}

export function requestLogin(){
	return {
		type: "REQUEST_LOGIN"
	}
}

export function recieveLoginSucc(){
	return {
		type: "RECIEVE_LOGIN_SUCC",
		recievedAt: Date.now()	
	}
}

export function recieveLoginErr(){
	return {
		type: "RECIEVE_LOGIN_ERR",
	}
}

export function requestLogout(){
	return {
		type: "REQUEST_LOGOUT"
	}
}

export function recieveLogoutSucc(){
	return {
		type: "RECIEVE_LOGOUT_SUCC",
		recievedAt: Date.now()	
	}
}

export function recieveLogoutErr(){
	return {
		type: "RECIEVE_LOGOUT_ERR",
	}
}

export function login(password){
	return dispatch => {
		dispatch(requestLogin())
		return fetch('/trojkaset/scheduler.php',{method: 'POST', body: "password="+password+"&action=login", headers: {'content-type': 'application/x-www-form-urlencoded',  credentials: 'include'}})
		.then(handleErrors)
		.then(
            response =>  response.text(),
			error =>  {dispatch(recieveLoginErr()); throw error}
		).then(
			text => {
				if(text.trim() === "NOK"){
					dispatch(recieveLoginErr())
					let e = new Error('Wrong password')
					e.name = "ValidationError"
					throw e
				}else{
					dispatch(recieveLoginSucc())
					return text.trim()
				}
			}
		)
	}
}

export function logout(){
	return dispatch => {
		dispatch(requestLogout())
		return fetch('/trojkaset/scheduler.php?action=logout',{credentials: 'include'})
		.then(handleErrors)
		.then(
            response =>  dispatch(recieveLogoutSucc()),
			error =>  {dispatch(recieveLogoutErr()); throw error}
		)
	}
}

export function openSnackbar(message){
	return {
		type: "OPEN_SNACKBAR",
		message: message
	}
}

export function closeSnackbar(){
	return {
		type: "CLOSE_SNACKBAR",
	}
}


