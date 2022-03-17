import nc from 'next-connect';
import { allTours } from '../../../controllers/tourController';
import connectDb from '../../../config/connectDb';

const handler = nc();

connectDb();

handler.get(allTours);

export default handler;
