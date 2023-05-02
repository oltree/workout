export const getUserDto = user => {
	const updatedUser = {};

	for (let key in user) {
		if (key !== 'password') {
			updatedUser[key] = user[key];
		}
	}

	return updatedUser;
};
