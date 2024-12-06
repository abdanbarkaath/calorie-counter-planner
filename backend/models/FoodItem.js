const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  food_name: { type: String, required: true },
  nf_calories: { type: Number, required: true },
  serving_qty: { type: Number, required: true },
  serving_unit: { type: String, required: true },
  nf_total_fat: { type: Number },
  nf_protein: { type: Number },
  nf_total_carbohydrate: { type: Number },
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
