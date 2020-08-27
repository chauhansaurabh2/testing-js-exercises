const meaning = require('./mightyComputer');

const { calculateMeaningOfLive } = meaning;
//resolves syntax
test('mightyComputer calculates the meaning', () => {
	expect(calculateMeaningOfLive()).resolves.toBe(42);
});
//async await
test('mightyComputer calculates the meaning', async () => {
	let result = await calculateMeaningOfLive();
	expect(result).toBe(42);
});

//rejects syntax
test('mightyComputer loses focus when disturb', () => {
	var result = calculateMeaningOfLive([1]);

	expect(result).rejects.toThrow('Has been distrubed and lost track of calculation.Please try again.');
});
//async await syntax
test('mightyComputer loses focus when disturb', async () => {
	try {
		var result = await calculateMeaningOfLive([1]);
	} catch (e) {
		console.log('error is', e);
		expect(e.message).toBe('Has been distrubed and lost track of calculation.Please try again.');
	}
});
