
import React from "react";
import { shallow } from "enzyme";
import { EditEvent } from "./EditEvent";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { EventForm } from './EventForm'
/*Component contract
- it doesnt render if there is no event with id
- it renders div of class EditEvent
- it contains all other elements
- it renders a form used to edit the event
- it provides form with event 
- it disables the form if there is action pending
*/

configure({ adapter: new Adapter() });


describe("EditEvent", () => {
  let props;
  let mountedEditEvent;
  const editEvent = () => {
    if (!mountedEditEvent) {
      mountedEditEvent = shallow(
        <EditEvent {...props} />
      );
    }
    return mountedEditEvent;
  }

  beforeEach(() => {
    props = {
      isFetching: undefined,
      event: {name: "event", id: "20"}
    };
    mountedEditEvent = undefined;
  });

  it("doesn't render anything if there is no event with id",() => {
    props = {event: {name:"event"}}
    expect(editEvent().find("div").length).toBe(0)
  })

  it("renders a div", () => {
	  const divs = editEvent().find("div");
	  expect(divs.length).toBeGreaterThan(0);
  })

  it("contains everything else that gets rendered", () => {
    const divs = editEvent().find("div");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(editEvent().children());
  })

  it("renders a form component", ()=>{
  	expect(editEvent().find('.event-form').length).toBe(1);
  })

  it("gives form a prop that handles submit", ()=>{
  	expect(editEvent().find('.event-form').props().onSubmit).toBe(editEvent().instance().onSubmit)
  })  

  it("passes element prop to the form",()=>{
    expect(editEvent().find('.event-form').props().initialValues.id).toBe(props.event.id)
  })
  // All tests will go here
});