import nc from 'next-connect';
import { getTours, newTour } from '../../../controllers/tourController';
import connectDb from '../../../config/connectDb';

const handler = nc();

connectDb();

handler.get(getTours);
handler.post(newTour);

export default handler;
