import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Display from './Display';

test('Display displays the value prop', () => {
	const { getByText, debug } = render(<Display value="HERO" />);
	expect(getByText(/hero/i)).not.toBeNull();
});
