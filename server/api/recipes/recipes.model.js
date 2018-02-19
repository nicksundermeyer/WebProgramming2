import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let ingredientsSchema = Schema({
  ingredients: { type: [String], required: true }
});

// This is the main user schema
let recipeSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  preptime: { type: Number, required: true },
  cooktime: { type: Number, required: true },
  directions: { type: [String], required: true },
  ingredients: { type: ingredientsSchema, required: true },
  reviews: { type: [ObjectId], required: false }
});

// This is the main user schema
let reviewSchema = Schema({
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, required: false },
  user: { type: ObjectId, required: true }
});

let Recipe = mongoose.model('Recipe', recipeSchema);
let Review = mongoose.model('Review', reviewSchema);

// Export the two created models, Address and User
export { Recipe, Review };
