import View from "./View";
import icons from '../../../img/icons.svg';

export default new (class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);

        
        // Page 1, and there are other pages;
        // Page 1, and there are NO oter pages;
        // Last page;
        // Other page;
    };
})();