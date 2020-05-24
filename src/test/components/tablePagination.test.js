import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
import HackerNewsTable from './../../components/newsDataTable';
const title = 'Home';
let wrapped = shallow(<HackerNewsTable>{title}</HackerNewsTable>);
describe('Testing Table pagination action button', () => {
    
  it('should render the Title Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
  it('renders the Titles children', () => { 
    // expect(wrapped.find('h1').text()).toEqual(title);
  });
});