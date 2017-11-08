export function getOccupiedPlaces(events, date){
      return events.filter((event)=>event.date === date).map((event)=>event.place)
}

export function getEventById(events, id){
	
}