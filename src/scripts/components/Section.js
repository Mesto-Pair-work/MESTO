export class Section {
    constructor(renderer, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
    setItem(element, after = false) {
      if(after) {
        this._container.prepend(element);
      } else {
        this._container.append(element);
      }
    }
  
    renderItems(items, userId) {
      items.forEach(item => {
        item.userId = userId;
        this._renderer(item);
      });
    }
  }