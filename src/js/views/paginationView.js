import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
  _parentElement = document.querySelector('.pagination');
  // _curPage = this.data.page;
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _prevBtnMarkup() {
    return `
      <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
    `;
  }

  _nextBtnMarkup() {
    return `
      <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateMarkup() {
    // this._data == whole search results
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const totalPagesMarkup = `
      <span class="total-pages">
        <span class="total-pages--cur">${curPage}</span><span>/${numPages}</span>
      </span>
    `;
    // Page 1 && there are other pages
    if (curPage === 1 && numPages > 1) {
      const markup = totalPagesMarkup + this._nextBtnMarkup();
      return markup;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      const markup = this._prevBtnMarkup() + totalPagesMarkup;
      return markup;
    }
    // Other page
    if (curPage < numPages) {
      const markup = this._prevBtnMarkup() + totalPagesMarkup + this._nextBtnMarkup();
      return markup;
    }
    // Page 1 && there are NO other page
    return totalPagesMarkup;
  }
}
export default new PaginationView();