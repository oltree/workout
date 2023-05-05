export const getUserWithoutPassword = user => {
	const { password, ...userWithoutPassword } = user;

	return userWithoutPassword;
};
