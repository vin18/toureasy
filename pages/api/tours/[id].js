import nc from 'next-connect';
import {
  getTour,
  updateTour,
  deleteTour,
} from '../../../controllers/tourController';
import connectDb from '../../../config/connectDb';

const handler = nc();

connectDb();

handler.get(getTour);
handler.patch(updateTour);
handler.delete(deleteTour);

export default handler;
