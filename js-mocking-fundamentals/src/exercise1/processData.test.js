const { processData } = require('./processData');
jest.mock('./api', () => {
	return {
		getPrefixedData: (input) => {
			return [`${input}1`, `${input}2`, `${input}3`];
		}
	};
});

test('The processData function returns an array of prefixed data', async () => {
	let actual = await processData('sim');
	expect(actual).toStrictEqual(['sim1', 'sim2', 'sim3']);
});
test('The processData function throws an error when input is empty', async () => {
	let actual = processData(false);
	expect(actual).rejects.toThrow('I need to have a value');
});
