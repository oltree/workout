import jwt from 'jsonwebtoken';

export const generateToken = userId => {
	return jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: '10d' });
};
