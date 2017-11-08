
import React from "react";
import { shallow } from "enzyme";
import { CreateEvent } from "./CreateEvent";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { EventForm } from './EventForm'
/*Component contract
-it renders div of class CreateEvent
-everything is in this div
-it always renders form
-form is given on submit prop that is a function 'onSubmit' on the component
-form is given disabled prop if some action of this type is pending
-component holds list of occupied places for this event in its state
-occupied places are passed to the form
-form recieves only date as initial value
-it pulls date from url if present
*/

configure({ adapter: new Adapter() });


describe("CreateEvent", () => {
  let props;
  let mountedCreateEvent;
  const createEvent = () => {
    if (!mountedCreateEvent) {
      mountedCreateEvent = shallow(
        <CreateEvent {...props} />
      );
    }
    return mountedCreateEvent;
  }

  beforeEach(() => {
    props = {
      isFetching: undefined,
      events: undefined,
      date: "2017-11-11"
    };
    mountedCreateEvent = undefined;
  });

  it("always renders a div", () => {
	  const divs = createEvent().find("div");
	  expect(divs.length).toBeGreaterThan(0);
  });

  it("contains everything else that gets rendered", () => {
    const divs = createEvent().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(createEvent().children());
  });

  it("renders a form component", ()=>{
  	expect(createEvent().find('.event-form').length).toBe(1);
  })

  it("gives form a prop that handles submit", ()=>{
  	expect(createEvent().find('.event-form').props().onSubmit).toBe(createEvent().instance().onSubmit)
  })

  it("disables the form if the current action is pending", ()=>{
    props = {...props,isFetching: {type: "REQUEST_ADD_EVENT"}}
    expect(createEvent().find('.event-form').props().submitDisabled).toBe(true)
  })


  it("gives form a list of disabled places if state:occupiedPlaces is set", ()=>{
  	var places = [{place: 'place'}]
  	createEvent().setState({occupiedPlaces: places})
  	expect(createEvent().find('.event-form').props().disabled).toBe(places)
  })

  it("gives form date as initial value", ()=>{
  	expect(createEvent().find('.event-form').props().initialValues).toEqual({'date': new Date("2017-11-11")})
  })  
  // All tests will go here
});