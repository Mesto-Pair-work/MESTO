export class Section {
    constructor(userId, cards, renderer, containerSelector) {
      this._renderedItems = cards;
      this._renderer = renderer;
      this._container = containerSelector;
      this._renderedUser = userId;
    }
  
    setItem(element) {
      this._container.prepend(element);
    }
  
    renderItems() {
      this._renderedItems.forEach(item => {
        item.userId = this._renderedUser;
        this._renderer(item);
      });
    }
  }