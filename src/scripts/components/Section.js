export class Section {
    constructor(renderer, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
    setItem(element) {
      this._container.prepend(element);
    }
  
    renderItems(items, userId) {
      items.forEach(item => {
        item.userId = userId;
        this._renderer(item);
      });
    }
  }