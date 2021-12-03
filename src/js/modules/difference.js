export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e) {}
    }

    bimdTriggers(container, items, count) {
        container.querySelector('.plus').addEventListener('click', ()=> {
            if (count !== items.length - 2) {
               items[count].style.display = 'flex';
               items[count].classList.add('animated', 'fadeIn');
               count ++;
            } else {
                items[count].style.display = 'flex';
                items[items.length - 1].style.display = 'none';
                const button = document.createElement('button');
                button.classList.add('linkBack', 'officer__card-item', 'card__click');
                button.innerHTML = 'Свернуть обратно';
                count++;

                container.append(button);
                const but = document.querySelectorAll('.linkBack');
                but.forEach(item => {
                    item.addEventListener('click', ()=> {
                        
                        let newItems = Array.from(items).slice(0,count);
                        newItems.forEach(item => item.style.display = 'none');
                        items[items.length - 1].style.display = 'flex';
                        count = 0;
                        button.remove();
                    });
                });
            }
        });
        
    }


    hideItems(items) {
        items.forEach((item, i, arr) => {
            if(i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }


    init() {
try {
    this.hideItems(this.newItems);
    this.hideItems(this.oldItems);
    this.bimdTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
    this.bimdTriggers(this.newOfficer, this.newItems, this.newCounter);
}catch(e){}

    }
}