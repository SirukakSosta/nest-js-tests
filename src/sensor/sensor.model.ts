import * as mongoose from 'mongoose';

export const SensorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
});
export interface Sensor extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
}
