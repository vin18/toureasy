import Tour from '../models/tourModel';
import { StatusCodes } from 'http-status-codes';

/**
 * @desc    Get all tours
 * @route   GET /api/tours
 * @access  Public
 */
const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(StatusCodes.OK).json({
      success: true,
      count: tours.length,
      tours,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      error: error.message,
    });
  }
};

/**
 * @desc    Get single tour
 * @route   GET /api/tours/:id
 * @access  Public
 */
const getTour = async (req, res) => {
  const { id } = req.query;
  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: true,
        error: `Tour not found with the id: ${id}`,
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      error: error.message,
    });
  }
};

/**
 * @desc    Create new tour
 * @route   POST /api/tours
 * @access  Private
 */
const newTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      error: error.message,
    });
  }
};

/**
 * @desc    Update single tour
 * @route   PATCH /api/tours/:id
 * @access  Private
 */
const updateTour = async (req, res) => {
  const { id } = req.query;
  try {
    let tour = await Tour.findById(id);

    if (!tour) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: true,
        error: `Tour not found with the id: ${id}`,
      });
    }

    tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      error: error.message,
    });
  }
};

/**
 * @desc    Delete single tour
 * @route   DELETE /api/tours/:id
 * @access  Private
 */
const deleteTour = async (req, res) => {
  const { id } = req.query;
  try {
    let tour = await Tour.findById(id);

    if (!tour) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: true,
        error: `Tour not found with the id: ${id}`,
      });
    }

    await tour.remove();

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Tour is deleted`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      error: error.message,
    });
  }
};

export { getTours, getTour, newTour, updateTour, deleteTour };
