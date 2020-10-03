import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, wait } from '@testing-library/react';

import ToDo from '../Todo';

describe('Todo', () => {
	test('should render todoForm only when no todos', () => {
		render(<ToDo />);
		expect(screen.getByPlaceholderText(/What needs to be done/i)).not.toBeNull();
	});
	test.skip('should add a todo upon click of Add', async () => {
		render(<ToDo />);
		const input = screen.getByPlaceholderText(/What needs to be done/i);
		const AddBtn = screen.getByText(/add/i);

		userEvent.type(input, 'Get outside');
		userEvent.click(AddBtn);

		await wait(() => {
			expect(getByText(/get outside/i)).toBeInTheDocument();
		});
	});
});
