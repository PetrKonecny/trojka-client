import React from "react";
import { shallow } from "enzyme";
import { EventDetail } from "./EventDetail";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { EventForm } from './EventForm'

/*Component contract
- displays every property of the element to the page 
- does not display undefined fields
- hide fields with names given in prop
- show element controls if showControlls prop is given
*/
configure({ adapter: new Adapter() });

describe("EventDetail", () => {
	const event = {
		id: '1',
		name: 'name',
		date: '2017-11-11',
		place: 'kavárna',
		link: 'www.link.com',
		lights: '1', 
		lights_more: 'more about lights',
		sound: '1',
		sound_more: 'more about sound',
		type: 'concert',
		org: 'organization',
		mail: 'mail@mail.com',
		phone: '123456789', 
		contact: 'contact',
		projector: '1',
		osa: '1',
		anotation: 'anotation' , 
		count: '25' , 
		time: '10:20' , 
		anotation_poster: 'anotation on poster' , 
		time_preparation: '10:00' , 
		rating: 'rating'
	}

	let props;
	let mountedEventDetail;
	const eventDetail = () => {
		if (!mountedEventDetail) {
		mountedEventDetail = shallow(
		<EventDetail {...props} />
		);
	}
		return mountedEventDetail;
	}

	beforeEach(() => {
		props = {
			data: event,
			showOnly: undefined,
			showControls: undefined
		}
		mountedEventDetail = undefined
	})

	Object.keys(event).forEach((key)=>{
		it("displays property " + key,()=>{
			expect(eventDetail().find('.event-detail-'+key).length).toBe(1);
		})
	})

	it("does not display properties not specified in show only",()=>{
		props.showOnly = ['id']
		Object.keys(event).forEach((key)=>{
			key !== 'id' && expect(eventDetail().find('.event-detail-'+key).length).toBe(0);
		})
	})

	it("does not display controls by default",()=>{
		expect(eventDetail().find('.event-detail-controls').length).toBe(0);
	})

	it("display controls if showControls prop given",()=>{
		props.showControls = true
		expect(eventDetail().find('.event-detail-controls').length).toBe(1);
	})

	it("does not display undefined field",()=>{
		props.data = Object.assign({},event,{name: undefined})
		expect(eventDetail().find('.event-detail-name').length).toBe(0);
	})
})