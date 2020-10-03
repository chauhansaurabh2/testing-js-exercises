import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import Login from './Login';
import { render as rtlRender, wait, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('login form', () => {
	function render(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }), ...renderOptions } = {}) {
		function Wrapper({ children }) {
			return <Router history={history}>{children}</Router>;
		}
		return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
	}
	test('should render the login form', () => {
		render(<Login />);
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.queryAllByText(/login/i)).not.toBeNull();
	});

	test('should show error upon bad input', async () => {
		render(<Login />);

		const loginTextBox = screen.getByLabelText(/username/i);
		const passwordTextBox = screen.getByLabelText(/password/i);
		const loginBtn = screen.queryAllByText(/login/i)[1];

		userEvent.type(loginTextBox, 'admin');
		userEvent.type(passwordTextBox, 'adminoo');
		userEvent.click(loginBtn);

		await wait(() => {
			expect(screen.getByText(/login failed/i)).toBeInTheDocument();
		});
	});

	test('should redirect to the todo page upon success login', async () => {
		const history = createMemoryHistory({ initialEntries: ['/'] });
		render(<Login />, { history });

		const loginTextBox = screen.getByLabelText(/username/i);
		const passwordTextBox = screen.getByLabelText(/password/i);
		const loginBtn = screen.queryAllByText(/login/i)[1];

		userEvent.type(loginTextBox, 'admin');
		userEvent.type(passwordTextBox, 'admin');
		userEvent.click(loginBtn);

		await wait(() => {
			expect('/todo').toBe(history.location.pathname);
		});
	});

	test('should disable button on save ', () => {
		render(<Login />);

		const loginTextBox = screen.getByLabelText(/username/i);
		const passwordTextBox = screen.getByLabelText(/password/i);
		const loginBtn = screen.queryAllByText(/login/i)[1];

		userEvent.type(loginTextBox, 'admin');
		userEvent.type(passwordTextBox, 'admin');
		userEvent.click(loginBtn);

		expect(loginBtn).toBeDisabled();
	});
});
