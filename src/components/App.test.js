import {render, screen} from '@testing-library/react';
import App from './App';

test('renders QuoteBox component', () => {
    render(<App />);
    expect(screen.getByText(/new quote/i)).toBeInTheDocument();
});