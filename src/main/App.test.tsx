import React from 'react';
import App from './App';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App /> shallow rendering', () => {
  it('Render App test', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
