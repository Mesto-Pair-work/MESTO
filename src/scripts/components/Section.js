export class Section {
    constructor(renderer, containerSelector) {
      this._renderer = renderer;
      this._container = containerSelector;
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