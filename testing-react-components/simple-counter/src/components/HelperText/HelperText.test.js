import React from 'react';
import { render } from '@testing-library/react';
import HelperText from './HelperText';

test('HelperText renders with default values', () => {
	const { getByText } = render(<HelperText>Work</HelperText>);
	expect(getByText(/work/i)).not.toBeNull();
	expect(getByText(/work/i)).toHaveStyle('color: teal');
});

test('HelperText does not render', () => {
	const { queryByText } = render(<HelperText show={false}>Work</HelperText>);
	expect(queryByText(/work/i)).toBeNull();
});

test('HelperText does render success', () => {
	const { getByText } = render(
		<HelperText show={true} type={'success'}>
			Success
		</HelperText>
	);
	expect(getByText(/success/i)).not.toBeNull();
	expect(getByText(/success/i)).toHaveStyle('color: green');
});

test('HelperText does render error', () => {
	const { getByText } = render(
		<HelperText show={true} type={'error'}>
			Error Here
		</HelperText>
	);
	expect(getByText(/error here/i)).not.toBeNull();
	expect(getByText(/error here/i)).toHaveStyle('color: darkred');
});

test('HelperText does render warning', () => {
	const { getByText } = render(
		<HelperText show={true} type={'warning'}>
			Warning Here
		</HelperText>
	);
	expect(getByText(/warning here/i)).not.toBeNull();
	expect(getByText(/warning here/i)).toHaveStyle('color: gold');
});
