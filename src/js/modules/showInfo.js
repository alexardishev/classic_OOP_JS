export default class ShowInfo {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);

    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', ()=> {
                const img = btn.querySelector('img');
                let svg = btn.querySelector('svg');
                const sibling = btn.closest('.module__info-show').nextElementSibling;

                if (img) {
                    svg.style.display = 'block';   
                    sibling.classList.toggle('msg');
                    img.remove();
                } else {

                    sibling.classList.toggle('msg');
                    sibling.style.marginTop = '20px';
                    svg.style.display = 'none';            
                    const newImg = document.createElement('img');
                    newImg.setAttribute('src', 'assets/icons/minus.svg');
                    newImg.style.display = 'block';
                    btn.appendChild(newImg);

                }


            });
        });
    }
}