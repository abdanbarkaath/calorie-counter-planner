const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add a new food item
router.post('/', async (req, res) => {
  try {
    const newFood = new FoodItem(req.body);
    await newFood.save();
    res.json(newFood);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update a food item
router.put('/:id', async (req, res) => {
  try {
    const updatedFood = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFood);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a food item
router.delete('/:id', async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
