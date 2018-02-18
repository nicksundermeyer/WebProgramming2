import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// This schema represents the name of the user
let nameSchema = Schema({
  // firstName is a simple String type that is required
  firstName: { type: String, required: true },
  // middleName is a simple String type that is not required
  middleName: { type: String, required: false },
  // lastName is a simple String type that is required
  lastName: { type: String, required: true }
});

// This is the main user schema
let userSchema = Schema({
  name: { type: nameSchema, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true }
});

let User = mongoose.model('User', userSchema);

// Export the two created models, Address and User
export { User };
