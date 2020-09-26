import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import Login from './Login';
import { fireEvent, render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('login form', () => {
	test('should render the login form', () => {
		const { getByLabelText, queryAllByText } = render(<Login />);

		// expect(getByLabelText(/username/i)).toBeInDocument();
		expect(getByLabelText(/username/i)).not.toBeNull();
		expect(getByLabelText(/password/i)).not.toBeNull();
		expect(queryAllByText(/login/i)).not.toBeNull();
	});

	// test('should disable login button upon click', async () => {
	// 	const { queryAllByText, debug } = render(<Login />);
	// 	const loginBtn = queryAllByText(/login/i)[1];

	// 	fireEvent.click(loginBtn);
	// 	expect(loginBtn).toBeDisabled();
	// });

	test('should show error upon bad input', async () => {
		const { queryAllByText, getByLabelText, getByRole, debug } = render(<Login />);
		const loginTextBox = getByLabelText(/username/i);
		const passwordTextBox = getByLabelText(/password/i);
		const loginBtn = queryAllByText(/login/i)[1];

		userEvent.type(loginTextBox, 'admin');
		userEvent.type(passwordTextBox, 'adminoo');

		fireEvent.click(loginBtn);
		await wait(() => {
			expect(getByRole('alert')).not.toBeNull();
		});
	});

	test('should redirect to the todo page upon success login', async () => {
		const history = createMemoryHistory({ initialEntries: ['/'] });
		const { queryAllByText, getByLabelText } = render(
			<Router history={history}>
				<Login />
			</Router>
		);

		const loginTextBox = getByLabelText(/username/i);
		const passwordTextBox = getByLabelText(/password/i);
		const loginBtn = queryAllByText(/login/i)[1];

		userEvent.type(loginTextBox, 'admin');
		userEvent.type(passwordTextBox, 'admin');
		fireEvent.click(loginBtn);

		await wait(() => {
			expect('/todo').toBe(history.location.pathname);
		});
	});
});
