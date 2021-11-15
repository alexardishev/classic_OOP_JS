export default class Slider {
    constructor(page, btns) { // Сюда помещаем те свойства слайдера, которые перед работой ему нужны
        this.page = document.querySelector(page); // Страница на которой будет работать слайдер
        this.slides = this.page.children;  // Слайды, которые будут внутри слайдера
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
        this.block = document.querySelector('.hanson');
    }

    showSlides (n) {
        
        this.block.style.display = 'none';
        if (n > this.slides.length) { // Если слайдов больше чем n тогда вернемся на первый
            this.slideIndex = 1;
        } 

        if (n < 1) { // Если n меньше единицы, тогда в конец идем
            this.slideIndex =  this.slides.length;
        }


        this.slides.forEach(slide => {
            slide.style.display = 'none' // Убираем все слайды со страницы изначально

        });
        this.slides[this.slideIndex-1].classList.add('animated', 'fadeIn');
        this.slides[this.slideIndex -1].style.display = 'block'; // начинаем с 0

        if(n === 3) {
            this.showBlock('.hanson', 3000);
        }
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex +=n); // На второй страницы чтобы можно было перелистывать прибавлять
        
        
    
    }

    showBlock(selectorBlock, time) {
        const block = document.querySelector(selectorBlock);
        
        setTimeout(()=> {
            block.style.display = 'block';  
            block.classList.add('animated', 'slideInUp');
        }, time);
    }


    render() {
        this.btns.forEach(item => {
            item.addEventListener('click', ()=> { // При нажатии на кнопку вызываем функцию переключения вперед
                this.plusSlides(1); // И передаем туда 1 на сколько слайдер будет переключаться
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e)=> {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}