const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message || 'Something went wrong',
  });
};

module.exports = errorMiddleware;
