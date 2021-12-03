import Slider from "./slider";


export default class MainSlider extends Slider {
    constructor(reer) {
        super(reer); // Метод чтобы получить доступ к свойствам класса
        console.log(reer);
        
    }
    
    showSlides (n) {
        try{
            this.block.style.display = 'none';
        } catch(e) {}

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

    showBlock(selectorBlock = null, time) {
        const block = document.querySelector(selectorBlock);

            if(block) {
                setTimeout(()=> {
                    block.style.display = 'block';  
                    block.classList.add('animated', 'slideInUp');
                }, time);
            }
           

       
    }

    bindTriggers() {
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
            try{

                document.querySelectorAll('.prevmodule').forEach(item => {
                    item.addEventListener('click', ()=> {
                        this.plusSlides(-1)
                    });
                });
                document.querySelectorAll('.nextmodule').forEach(item => {
                    item.addEventListener('click', (e)=> {
                        e.stopPropagation();
                        this.plusSlides(1)
                    });
                });
            } catch{}
    }

    render() {
         if(this.container){

            this.showSlides(this.slideIndex);
            this.bindTriggers();
        } 
    }
}