export default class Slider {
    constructor({ container = null,
         btns =null, 
         next =null, 
         prev = null,
        activeClass = '',
        animate,
        autoplay} = {}) { // Сюда помещаем те свойства слайдера, которые перед работой ему нужны // Передадим null чтобы не было ошибки с квериселектор
        this.container = document.querySelector(container); // Страница на которой будет работать слайдер
        this.slides = this.container.children;  // Слайды, которые будут внутри слайдера
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
        this.block = document.querySelector('.hanson');
    }

}