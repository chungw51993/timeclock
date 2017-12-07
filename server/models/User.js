import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  clockedIn: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
