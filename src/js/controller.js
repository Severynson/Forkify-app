import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';
// https://forkify-api.herokuapp.com/v2

// if(module.hot) module.hot.accept();

const contolRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();
     // 1) Loading recipe;
    await model.loadRecipe(id);
    // 2) Rendering recipe;
  recipeView.render(model.state.recipe);
    // TEST
      controlServings();
  } catch (err) {
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
    resultsView.render(model.getSearchResultsPage());
    // 4) Render initial pagination buttons;
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = (goToPage) => {
   // 3) Render NEW results;
   resultsView.render(model.getSearchResultsPage(goToPage));
   // 4) Render NEW pagination buttons;
   paginationView.render(model.state.search);
};

const controlServings = (newServings = 1) => {
  // Updating recipe data;
  if (newServings < 1) return;
  model.updateServings(newServings);
  // Updating the view;
  recipeView.render(model.state.recipe);
};

const init = () => {
  recipeView.addHandlerRender(contolRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

