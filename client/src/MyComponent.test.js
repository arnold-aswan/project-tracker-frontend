import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from './AboutUs';
describe('AboutUs Component', () => {
    it('renders the component', () => {
      const { getByText } = render(<AboutUs />);
 // To est if the component renders without errors
 expect(getByText('About Us')).toBeInTheDocument();
});
it('displays mission and vision content', () => {
    const { getByText } = render(<AboutUs />);

    // Test that the mission and vision content is present
    expect(getByText('Our Mission')).toBeInTheDocument();
    expect(getByText('Our Vision')).toBeInTheDocument();

    // You can add more specific content checks here
    expect(getByText('We are on a mission to revolutionize the way teams manage their projects.')).toBeInTheDocument();
    expect(getByText('We envision a world where every project, no matter the size or complexity, can be efficiently managed and completed on time.')).toBeInTheDocument();
  });