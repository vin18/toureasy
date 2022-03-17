const allTours = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'All tours',
  });
};

export { allTours };
