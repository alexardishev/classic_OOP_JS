export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input')
        this.message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        this.path = {
            question: 'assets/question.php'
        };
    }

    starInput() {
    const req = document.querySelectorAll('[required]');
    console.log(req);

        req.forEach(input => {

            input.addEventListener('focus', ()=> {
                if(!input.value) {
                    input.style.border = '2px solid red';
                } 
                if(input.value){
                    input.style.border = 'none';
                }
            });

            input.addEventListener('input', ()=> {
                if(!input.value) {
                    input.style.border = '2px solid red';
                } 
                if(input.value){
                    input.style.border = 'none';
                }
            });
 

        });
    }
    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        })
    }


    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e){
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
    
    
            });
    
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
    
            if(elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if(elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
    
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-__',
                i = 0,
                def = matrix.replace(/\D/g, ''), // Получу все не цифры и заменю их на пробелы
                val = this.value.replace(/\D/g, '');
    
    
            if (def.length >= val.length) { // Если пользак будет удалять что то, и длина не сойдется, тогда подставим по дефолту значение
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a){
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i>= val.length ? '' : a; //
            });
        
    
            if(event.type === 'blur') {
                if(this.value.length == 2) {
                    this.value = ''
                }
            } else {
                setCursorPosition(this.value.length, this) 
    
                
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
    
        });
    }

    async postData(url, data) {
        let res = await fetch(url, { // если использую запрос, то он асинхрон и об этом надо писать 
            method: "POST",
            body: data
        });
    
        return await res.text();
    }


    init() {
        
        this.checkMailInputs();
        this.initMask();
        this.starInput();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) =>  {
                e.preventDefault();


                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `
                item.parentNode.appendChild(statusMessage); // помещаем в родителя


                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path.question, formData)
                .then(res => {
                    console.log(res);
                statusMessage.textContent = this.message.success;
                })
                .catch(()=> {
                    statusMessage.textContent = this.message.failure;
                })
                .finally(()=> {
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    },6000);
                });
                
            });
        });
    }
}