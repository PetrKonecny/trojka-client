

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

export function addEvent(event){
	return dispatch => {
		dispatch(requestAddEvent(event))
		var form_data =  Object.getOwnPropertyNames(event).map(function(k) { return [k, event[k]].join('=') }).join('&')
		return fetch('/trojkaset/scheduler.php',{method: 'POST', body: form_data, headers: {'content-type': 'application/x-www-form-urlencoded'}})
		.then(
            response => response.text(),
			error => dispatch(recieveAddEventErr())
		)
		.then(
			data => dispatch(recieveAddEventSucc(data)),
		)
	}


}

export function fetchEvents(){
	return dispatch => {
		dispatch(requestEvents())
		return fetch('/trojkaset/scheduler.php?action=get_calendar')
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
				}else if(data && data.trim === "guest"){
					dispatch(recieveLoginInfoSucc({loggedIn: true, admin: false}))
				}
			},
		)
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


