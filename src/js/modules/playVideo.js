export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');

    }

    bindTriggers() {

        this.btns.forEach(btn => {
            btn.addEventListener('click', ()=> {
                if(document.querySelector('iframe#frame')) { // Если уже есть , тогда не создаем новый экземпляр плеера
                    this.overlay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url'); // УРЛ видео с ютуба
                    this.createPlayer(path);
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
            videoId: `${url}` // url видео возьмем уже в кнопке 
          });


          console.log(this.player);
          this.overlay.style.display = 'flex'; // открываем модалку при инициализации  
    }

    init() { // Инициализация плеера
        const tag = document.createElement('script'); // Создаем тег скрипт

        tag.src = "https://www.youtube.com/iframe_api"; // Атрибут срси 
        const firstScriptTag = document.getElementsByTagName('script')[0]; // 
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // Находим первый скрипт, который есть и перед ним помещаем наш скрипт

        this.bindTriggers();
        this.bindCloseBtn();


    }
}


