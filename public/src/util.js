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

const data = {
  product: [
    { name: "콜라", price: 500, stock: 5 },
    { name: "사이다", price: 700, stock: 3 },
    { name: "파인애플맛 환타", price: 300, stock: 6 },
    { name: "포도맛 환타", price: 500, stock: 5 },
    { name: "코코아 주스", price: 500, stock: 5 },
    { name: "레몬에이드", price: 500, stock: 5 },
    { name: "커피우유", price: 500, stock: 5 },
    { name: "알로에", price: 500, stock: 6 },
    { name: "콘칩", price: 500, stock: 5 },
    { name: "새우깡", price: 1200, stock: 5 },
    { name: "감자칩", price: 1000, stock: 5 },
    { name: "칸쵸", price: 800, stock: 5 },
    { name: "딸바주스", price: 500, stock: 5 },
    { name: "초코우유1", price: 500, stock: 5 },
    { name: "초코우유2", price: 500, stock: 5 },
    { name: "초코우유3", price: 500, stock: 5 },
    { name: "코카콜라제로", price: 500, stock: 5 },
    { name: "파워에이드", price: 1000, stock: 5 },
    { name: "봉봉", price: 1200, stock: 5 },
  ],
  money: [
    { name: 10, count: 5 },
    { name: 50, count: 5 },
    { name: 100, count: 5 },
    { name: 500, count: 5 },
    { name: 1000, count: 5 },
    { name: 5000, count: 5 },
    { name: 10000, count: 5 },
    { name: 50000, count: 5 },
    { name: 100000, count: 5 },
  ],
};

export { _, delay, data };
