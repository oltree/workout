const TIME_FACTOR = 5;

export const calcMinutes = length => {
	return Math.ceil(length * TIME_FACTOR);
};
