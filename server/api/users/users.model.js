import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// This schema represents the name of the user
// All names have a minlenth of 1 to avoid blank names. Middle name is not required, but first and last name are
let nameSchema = Schema({
  // firstName is a simple String type that is required
  firstName: { type: String, required: true, minlength: 1 },
  // middleName is a simple String type that is not required
  middleName: { type: String, required: false, minlength: 1 },
  // lastName is a simple String type that is required
  lastName: { type: String, required: true, minlength: 1 }
});

// This is the main user schema
// Includes a nameSchema for the name, a username which is a string and also must be unique to avoid username overlaps. Email is the same, a string that is required and unique, because no two people should have the same email to avoid confusion.
let userSchema = Schema({
  name: { type: nameSchema, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true }
});

let User = mongoose.model('User', userSchema);

// export the User model
export { User };
