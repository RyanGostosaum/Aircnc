import * as mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  email: String
});

export default SessionSchema;
