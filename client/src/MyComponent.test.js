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

  it('displays "What Sets Us Apart" section content', () => {
    const { getByText } = render(<AboutUs />);

    // Test that the "What Sets Us Apart" section and its content is present
    expect(getByText('What Sets Us Apart')).toBeInTheDocument();
    expect(getByText('Cutting-Edge Technology')).toBeInTheDocument();
    expect(getByText('Unparalleled Support')).toBeInTheDocument();
     // You can add more specific content checks here
     expect(getByText('Our platform is built with a user-centric approach, ensuring an intuitive and user-friendly interface.')).toBeInTheDocument();
     expect(getByText('Our dedicated team is always ready to assist you with any questions or concerns you may have.')).toBeInTheDocument();
   });
 });




 import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactUs from './ContactUs';
describe('ContactUs Component', () => {
    it('renders the component', () => {
      const { getByText } = render(<ContactUs />);
  
      // Test that the component renders without errors
      expect(getByText('Contact Us')).toBeInTheDocument();
    });
    it('handles form input and submission', () => {
        const { getByText, getByLabelText, getByRole } = render(<ContactUs />);
        const nameInput = getByLabelText('Name');
        const emailInput = getByLabelText('Email');
        const messageInput = getByLabelText('Message');
        const submitButton = getByRole('button', { name: 'Send Message' });
    
        // Simulate user input
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });
           // Ensure the input fields have received the user's input
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(messageInput.value).toBe('Hello, this is a test message.');

    // Submit the form
    fireEvent.click(submitButton);

    // You can add more specific tests related to form submission here
  });
});