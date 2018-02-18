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

let Recipe = mongoose.model('Recipe', recipeSchema);

// Export the two created models, Address and User
export { Recipe };
