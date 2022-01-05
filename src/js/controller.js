import * as model from './model.js'
import recipeView from './views/recipeView.js';

////////////////
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const contolRecipes = async () => {
     // 1) Loading recipe;
  try {
    const id = window.location.hash.slice(1);
    if (!id) console.log('bida!')
    if (!id) return;
    recipeView.renderSpiner();
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    // 2) Rendering recipe;
  recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    await model.loadSearchResults('pizza');
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const init = () => {
  recipeView.addHandlerRender(contolRecipes)
};
init();

