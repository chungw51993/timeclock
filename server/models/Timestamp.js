import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TimestampSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  in: {
    type: String,
  },
  out: {
    type: String,
  },
  userId: {
    type: Schema.Types.String,
    ref: 'User',
  },
});

module.exports = mongoose.model('Timestamp', TimestampSchema);