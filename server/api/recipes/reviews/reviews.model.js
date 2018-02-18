import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ObjectId = mongoose.Schema.Types.ObjectId;

// This is the main user schema
let reviewSchema = Schema({
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, required: true },
  user: { type: ObjectId, required: true },
});

let Review = mongoose.model('Review', reviewSchema);

// Export the two created models, Address and User
export { Review };
