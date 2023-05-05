export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

export const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode);
	res.json({ message: err.message });
};
