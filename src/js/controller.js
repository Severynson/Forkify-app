import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import booksmarksView from './views/booksmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// https://forkify-api.herokuapp.com/v2

// if(module.hot) module.hot.accept();

const contolRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();
    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1) Updating bookmarks view;
    booksmarksView.update(model.state.bookmarks);
    // 2) Loading recipe;
    await model.loadRecipe(id);
    // 3) Rendering recipe;
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    console.log('Does it works at all?')
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

const controlPagination = goToPage => {
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
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // 1) Add/remove bookmark;
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view;
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks;
  booksmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  booksmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    // Show loading spiner;
    // addRecipeView.renderSpiner();
    // Upload the new recipe data;
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render recipe;
    recipeView.render(model.state.recipe);
    // Success message;
    recipeView.renderMessage();
    // Render bookmark view;
    booksmarksView.render(model.state.bookmarks);
    // Change ID in URL;
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    // Close form window;
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  };
};

const init = () => {
  booksmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(contolRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
