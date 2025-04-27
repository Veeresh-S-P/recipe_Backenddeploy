// models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    category: { type: String, required: true },
    image: { type: String },
    isPublic: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
