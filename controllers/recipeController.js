const Recipe = require('../models/Recipe');


const createRecipe = async (req, res) => {
    const { title, ingredients, steps, category, image, isPublic } = req.body;

    const recipe = new Recipe({
        user: req.user._id,
        title,
        ingredients,
        steps,
        category,
        image,
        isPublic
    });

    const created = await recipe.save();
    res.status(201).json(created);
};


const getPublicRecipes = async (req, res) => {
    const category = req.query.category;
    let query = { isPublic: true };
    if (category) query.category = category;

    const recipes = await Recipe.find(query).populate('user', 'name');
    res.json(recipes);
};

// @desc    Get my recipes
// @route   GET /api/recipes/my
// @access  Private
const getMyRecipes = async (req, res) => {
    const recipes = await Recipe.find({ user: req.user._id });
    res.json(recipes);
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
};

module.exports = {
    createRecipe,
    getPublicRecipes,
    getMyRecipes,
    updateRecipe,
    deleteRecipe,
};
