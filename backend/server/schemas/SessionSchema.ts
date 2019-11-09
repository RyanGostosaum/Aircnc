import * as mongoose from 'mongoose' 

const SessionSchema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String, 
    required: true
  }, 
  password: {
    type: String, 
    required: true
  }
});

export default SessionSchema;
