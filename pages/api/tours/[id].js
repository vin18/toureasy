import nc from 'next-connect';
import {
  getTour,
  updateTour,
  deleteTour,
} from '../../../controllers/tourController';
import connectDb from '../../../config/connectDb';
import onError from '../../../middlewares/errors';
import 'express-async-errors';

const handler = nc({ onError });

connectDb();

handler.get(getTour);
handler.patch(updateTour);
handler.delete(deleteTour);

export default handler;
