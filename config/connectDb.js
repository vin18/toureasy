import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
  if (mongoose.connection.readyState > 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected!`.cyan.underline.bold);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}` / red.bold);
  }
};

export default connectDb;
