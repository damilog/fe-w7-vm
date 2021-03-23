const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  $Remove: selector => {
    const el = _.$(`${selector}`);
    el.remove();
  },
  on: (el, type, cb) => el?.addEventListener(type, cb),
  add: (el, className) => el?.classList.add(className),
  remove: (el, className) => el?.classList.remove(className),
  toggle: (el, className) => el?.classList.toggle(className),
  contains: (el, className) => el?.classList.contains(className),
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  });

export { _, delay };
