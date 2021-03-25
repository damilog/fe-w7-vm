const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  $Remove: selector => {
    const el = _.$(`${selector}`);
    el.remove();
  },

  on: (el, type, cb) => el?.addEventListener(type, cb),
  insert: (el, position, text) => el?.insertAdjacentHTML(position, text),
  add: (el, className) => el?.classList.add(className),
  remove: (el, className) => el?.classList.remove(className),
  toggle: (el, className) => el?.classList.toggle(className),
  replace: (el, oldName, newName) => el?.classList.replace(oldName, newName),
  contains: (el, className) => el?.classList.contains(className),

  delay: time => new Promise(resolve => setTimeout(() => resolve(), time)),

  debounce: (func, delay) => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func.call(this), delay);
    };
  },
};

export { _ };
