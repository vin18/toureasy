import nc from 'next-connect';
import { getTours, newTour } from '../../../controllers/tourController';
import connectDb from '../../../config/connectDb';
import onError from '../../../middlewares/errors';
import 'express-async-errors';

const handler = nc({ onError });

connectDb();

handler.get(getTours);
handler.post(newTour);

export default handler;
