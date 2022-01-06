import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';
// https://forkify-api.herokuapp.com/v2

if(module.hot) module.hot.accept();

const contolRecipes = async () => {
     // 1) Loading recipe;
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();
    await model.loadRecipe(id);
    // 2) Rendering recipe;
  const recipe = model.state.recipe; 
  recipeView.render(recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();
    // 1) Get search query;
    const query = searchView.getQuery();
    // 2) Load search results;
    await model.loadSearchResults(query);
    // 3) Render results;
    resultsView.render(model.getSearchResultsPage(1));
    console.log(model.getSearchResultsPage(1));
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  recipeView.addHandlerRender(contolRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

