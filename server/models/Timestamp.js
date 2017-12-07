import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TimestampSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  in: {
    type: Date,
  },
  out: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Timestamp', TimestampSchema);