import mongoose from 'mongoose';
import config from '../config';

const { mongodbPath } = config;

export default class {
  constructor() {

  }
  initDB() {
    mongoose.connect(mongodbPath,{useMongoClient:true})
    console.log('mongodb is connect.');
  }
}

