import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
        
    }


    decorizeSlides(arr) {
        arr = Array.from(this.slides).filter(slide => slide.tagName !== 'BUTTON');
       
            arr.forEach(slide => {
                slide.classList.remove(this.activeClass); // изначально удалим ото всюду этот класс
                if (this.animate) { // убираем доп фичи
                    slide.querySelector('.card__title').style.opacity = '0.4';
                    slide.querySelector('.card__controls-arrow').style.opacity = '0';
                }
            });
    
            if(!arr[0].closest('button')) {
                arr[0].classList.add(this.activeClass); // Если не будет передан, то будет передаваться пустая  строка и ошибки не будет
            }
    
            
            if (this.animate) { // Если animate передали, тогда показываем при переключении первому слайду доп фичи
                arr[0].querySelector('.card__title').style.opacity = '1';
                arr[0].querySelector('.card__controls-arrow').style.opacity = '1';
            }
            
        

    }

    nextSlide() {

        if (this.container.classList.contains('feed__slider')) {
            // const slides = Array.from(this.slides)
            this.newSlides = Array.from(this.slides).filter(slide => slide.tagName !== 'BUTTON');
            this.container.appendChild(this.newSlides[0]);
  
            this.decorizeSlides(this.newSlides);
            
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides(this.slides);
        }
        
    }

    bindTriggers() {
        this.next.addEventListener('click', ()=> this.nextSlide());

        this.prev.addEventListener('click', ()=> {

            for(let i = this.slides.length - 1; i > 0; i--) {
                if(this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i]; // Последнмй слайд
                    this.container.insertBefore(active, this.slides[0]); // 1 аргумент элемент который хотим поместем, 2 аргумент перед каким помещаем
                    this.decorizeSlides();
                    break;
                }
            }



        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;

        `;

        this.bindTriggers();
        this.decorizeSlides();

        if(this.autoplay) {
            setInterval(() => this.nextSlide(), 5000)
        }
    }
}