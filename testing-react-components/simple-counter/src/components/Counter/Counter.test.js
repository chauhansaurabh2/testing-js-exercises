import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';
test('Counter renders', () => {
	const { getByText, debug } = render(<Counter />);
	const header = getByText(/counter/i);
	expect(header).not.toBeNull();
});

test('Counter increase and decreases value', () => {
	const { getByText, debug } = render(<Counter />);
	const increaseButton = getByText(/increase/i);
	const decreaseButton = getByText(/decrease/i);

	fireEvent.click(increaseButton);
	fireEvent.click(increaseButton);
	const increasedText = getByText(/2/i);
	expect(increasedText).not.toBeNull();

	fireEvent.click(decreaseButton);
	const decreasedText = getByText(/1/i);
	expect(decreasedText).not.toBeNull();
});

test('Counter show alert when trying to go below zero', () => {
	const { getByText, debug } = render(<Counter />);
	const increaseButton = getByText(/increase/i);
	const decreaseButton = getByText(/decrease/i);

	fireEvent.click(increaseButton);
	fireEvent.click(decreaseButton);
	fireEvent.click(decreaseButton);

	const alertText = getByText(/Can't go below 0/i);
	debug(alertText);
	expect(alertText).not.toBeNull();
	expect(alertText).toHaveStyle('color: darkred');
});

test('Counter hides alert when number is > 0', () => {
	const { getByText, queryByText, debug } = render(<Counter />);
	const increaseButton = getByText(/increase/i);
	const decreaseButton = getByText(/decrease/i);

	fireEvent.click(increaseButton);
	fireEvent.click(decreaseButton);
	fireEvent.click(decreaseButton);

	const alertText = getByText(/Can't go below 0/i);
	expect(alertText).not.toBeNull();

	fireEvent.click(increaseButton);
	const alertTextAfter = queryByText(/Can't go below 0/i);

	expect(alertTextAfter).toBeNull();
});
