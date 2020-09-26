import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, wait } from '@testing-library/react';

import ToDo from '../Todo';

describe('Todo', () => {
	test('should render todoForm only when no todos', () => {
		const { getByPlaceholderText } = render(<ToDo />);
		expect(getByPlaceholderText(/What needs to be done/i)).not.toBeNull();
	});
	test('should add a todo upon click of Add', async () => {
		const { getByPlaceholderText, getByText } = render(<ToDo />);
		const input = getByPlaceholderText(/What needs to be done/i);
		const AddBtn = getByText(/add/i);

		userEvent.type(input, 'Get outside');
		fireEvent.click(AddBtn);

		await wait(() => {
			expect(getByText(/get outside/i)).toBeInTheDocument();
		});
	});
});
