  
import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutPage } from './checkoutPage';

let wrapper;
beforeEach(() => {
  const mockProps = {
    cartItems: [],
    total: 100
  };

  wrapper = shallow(<CheckoutPage {...mockProps} />);
});

test('should render CheckoutPage component', () => {
  expect(wrapper).toMatchSnapshot();
});