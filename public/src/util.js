const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  $Remove: selector => {
    const el = _.$(`${selector}`);
    el.remove();
  },
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  });

export { _, delay };
