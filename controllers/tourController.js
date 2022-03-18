import Tour from '../models/tourModel';
import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../utils/error-handler';
import APIFeatures from '../utils/apiFeatures';

/**
 * @desc    Get all tours
 * @route   GET /api/tours
 * @access  Public
 */
const getTours = async (req, res) => {
  const resPerPage = 4;
  const toursCount = await Tour.countDocuments();

  const apiFeatures = new APIFeatures(Tour.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  const tours = await apiFeatures.query;
  const filteredToursCount = tours.length;

  res.status(StatusCodes.OK).json({
    success: true,
    toursCount,
    resPerPage,
    filteredToursCount,
    tours,
  });
};

/**
 * @desc    Get single tour
 * @route   GET /api/tours/:id
 * @access  Public
 */
const getTour = async (req, res, next) => {
  const { id } = req.query;
  const tour = await Tour.findById(id);

  if (!tour) {
    return next(new ErrorHandler(`Tour not found with the id: ${id}`,StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    tour,
  });
};

/**
 * @desc    Create new tour
 * @route   POST /api/tours
 * @access  Private
 */
const newTour = async (req, res) => {
  const tour = await Tour.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    tour,
  });
};

/**
 * @desc    Update single tour
 * @route   PATCH /api/tours/:id
 * @access  Private
 */
const updateTour = async (req, res, next) => {
  const { id } = req.query;
  let tour = await Tour.findById(id);
  
  if (!tour) {
    return next(new ErrorHandler(`Tour not found with the id: ${id}`,StatusCodes.NOT_FOUND));
  }

  tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    tour,
  });
};

/**
 * @desc    Delete single tour
 * @route   DELETE /api/tours/:id
 * @access  Private
 */
const deleteTour = async (req, res, next) => {
  const { id } = req.query;
  let tour = await Tour.findById(id);
  
  if (!tour) {
    return next(new ErrorHandler(`Tour not found with the id: ${id}`,StatusCodes.NOT_FOUND));
  }

  await tour.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Tour is deleted`,
  });
};

export { getTours, getTour, newTour, updateTour, deleteTour };
