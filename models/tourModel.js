import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `A tour must have a name`],
      unique: true,
      trim: true,
      maxlength: [40, `A tour name must have less or equal than 40 characters`],
      minlength: [10, `A tour name must have more or equal than 10 characters`],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, `A tour must have a price`],
      deault: 0,
    },
    description: {
      type: String,
      required: [true, `A tour must have a description`],
      trim: true,
    },
    location: {
      type: String,
      required: [true, `A tour must have a location`],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    rating: {
      type: Number,
      // TODO: Set default to 0 before deploying to production
      default: 4.5,
    },
    ratingsAverage: {
      type: Number,
      // TODO: Set default to 0 before deploying to production
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    numOfReviews: {
      type: Number,
      // TODO: Set default to 0 before deploying to production
      default: 25,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      // TODO: Set required to true before deploying to production
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema);
export default Tour;
