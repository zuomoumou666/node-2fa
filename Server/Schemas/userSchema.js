import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  psw: { type: String },
  createTime: { type: Date },
  lastChangeTime: { type: Date },
  tfa: {
    attempts: { type: Number, default: 0 },
    lastRequestTime: { type: Date, },
    lastAttemptsTime: { type: Date, },
    code: { type: String, },
    salt: { type: String, },
  },
});

export default UserSchema;