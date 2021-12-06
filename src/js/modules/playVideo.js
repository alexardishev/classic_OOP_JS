export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

    }

    bindTriggers() {

        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling; 

                if(i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
    
            } catch(e) {}

            btn.addEventListener('click', (e)=> {
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn; // То на что кликнул пользователь


                    if(document.querySelector('iframe#frame')) { // Если уже есть , тогда не создаем новый экземпляр плеера
                        this.overlay.style.display = 'flex';
                        if(this.path !== btn.getAttribute('data-url')) { // Если урл видео не равен тому, по котормоу мы кликнули, тогда перезаписываем айди видео и открываем плеер уже с другим айди
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        this.path = btn.getAttribute('data-url'); // УРЛ видео с ютуба
                        this.createPlayer(this.path);
                    }
    
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', ()=> {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    
    createPlayer(url) {
        this.player = new YT.Player('frame', { // id куда будет помещаться плеер
            height: '100%',
            width: '100%',
            videoId: `${url}`,// url видео возьмем уже в кнопке 
            events: {
                'onStateChange': this.onPlayerStateChange
              } 
          });


          this.overlay.style.display = 'flex'; // открываем модалку при инициализации  
    }

    onPlayerStateChange(state) {
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling; // Первый родитель у блока с этим селектором
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true); // Скопируем ноду
    
    
            if (state.data === 0) {
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) { // Есть или нет класс
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
    
                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch(e) {};
    }

    init() { // Инициализация плеера
        if (this.btns.length > 0) {
            const tag = document.createElement('script'); // Создаем тег скрипт

            tag.src = "https://www.youtube.com/iframe_api"; // Атрибут срси 
            const firstScriptTag = document.getElementsByTagName('script')[0]; // 
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // Находим первый скрипт, который есть и перед ним помещаем наш скрипт
    
            this.bindTriggers();
            this.bindCloseBtn();
        }



    }
}


