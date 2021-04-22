import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View{
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('upload__btn');
  _ingColumn = document.getElementById('ingColumn');
  _plusBtn = document.querySelector('.ing__plus');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerAddIng();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    this._overlay.addEventListener('click', this.toggleWindow.bind(this))
  }

  _addHandlerAddIng() {
    this._plusBtn.addEventListener('click', () => {this._addIngredient(this)});
  }
  _addIngredient() {
    let ings = this._ingColumn.querySelectorAll('label')
    this._plusBtn.classList.remove('ing__plus');
    this._plusBtn.remove();
    const markup = `
      \b
      <label>Ingredient ${ings.length + 1}</label>
      <input
        type="text"
        required
        name = "Ingredient-${ings.length + 1}"
        placeholder="Format: Quantity, Unit, Description"
      />
      <input type="button" class="btn ing__plus" value="+"></input>
    `
    this._ingColumn.insertAdjacentHTML('beforeend',markup);
    this._plusBtn = document.querySelector('.ing__plus');
    this._addHandlerAddIng();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }

  _generateMarkup() {
    
  }
}
export default new AddRecipeView();