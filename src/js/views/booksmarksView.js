import View from "./View";
import previewView from "./previewView";
import icons from '../../../img/icons.svg';

export default new (class bookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet! Find a nice recipe and bookmark it ;)';
    _message = '';

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    };

    // _generateMarkupPreview(result) {
    //     const id = window.location.hash.slice(1);

    //     return (`
    //     <li class="preview">
    //         <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${result.id}">
    //         <figure class="preview__fig">
    //             <img src="${result.image}" alt="${result.title}" />
    //         </figure>
    //         <div class="preview__data">
    //             <h4 class="preview__title">${result.title}</h4>
    //             <p class="preview__publisher">${result.publisher}</p>
    //         </div>
    //         </a>
    //     </li>
    // `);
    // };
})();