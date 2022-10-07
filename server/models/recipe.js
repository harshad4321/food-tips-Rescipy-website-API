const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});
recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipes', recipeSchema);