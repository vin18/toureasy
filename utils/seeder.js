const Tour = require('../models/tourModel');
const mongoose = require('mongoose');
const colors = require('colors');
const toursData = require('../data/tours');
const connectDb = require('../config/connectDb');

connectDb();

const seedTours = async (req, res) => {
  try {
    await Tour.deleteMany();
    console.log(`Tours are deleted!`.inverse.red);

    await Tour.insertMany(toursData.tours);
    console.log(`Tours are added!`.inverse.green);

    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

seedTours();
