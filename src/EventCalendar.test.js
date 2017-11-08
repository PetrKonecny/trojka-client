import React from "react";
import { shallow } from "enzyme";
import { EventCalendar } from "./EventCalendar";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { EventForm } from './EventForm'
/*Component contract
- it displays calendar element with class event-calendar
- it passes events prop into the calendar
- it doesn't render anything if no events are given
*/

configure({ adapter: new Adapter() });


describe("EventCalendar", () => {
  let props;
  let mountedCalendar;
  const eventCalendar = () => {
    if (!mountedCalendar) {
      mountedCalendar = shallow(
        <EventCalendar {...props} />
      );
    }
    return mountedCalendar;
  }

  beforeEach(() => {
    props = {
      events: [{name:'event1', id: 1},{name:'event2', id: 2}]
    };
    mountedCalendar = undefined;
  });

  it("renders a div", () => {
    const divs = eventCalendar().find("div");
    expect(divs.length).toBeGreaterThan(0);
  })

  it("doesn't render anything if there is no event with id",() => {
    props = {events: undefined}
    expect(eventCalendar().find("div").length).toBe(0)
  })

  it("renders a calendar", () => {
    expect(eventCalendar().find('.event-calendar').length).toBe(1);
  })

  it("passes events passed as props into the calendar",() => {
    expect(eventCalendar().find('.event-calendar').props().events).toBe(props.events);
  })

});