"use strict"//строгий режим

//проверка н ато что документ уже загружен
document.addEventListener('DOMContentLoaded', function (){
    const form = document.getElementById('form');//перехватываем отпрвку формы по нажатию кнопки
    form.addEventListener//при отправке формы переходим в функцию formSend

    async function formSend(e){
        e.preventDefault();//запрещаем стандартную отправку формы
        
        //проверка на правильность заполненой формы
        let error = formValidate(form);//присваиваем переменной error результат работы функции formValidete(form) 
        
        let formData = new FormData(form);//вытягиваем все данные полей
        formData.append('image', formImage.files[0]);//добаляем в эту переменную еще и фото


        if(error===0){//делаем правку с помощью технологии аякс, а именно с помощью fetch
            let response = await fetch('sendmail.php', {// ждем в переменную и в нее ждем выполнения  отправки методом POST данных  от FormData в файл sendmail.php
                method: 'POST',
                body: formData
            });
            if (responce.ok) {
                let resulr = await responce.json();
                alert(result.massage);
                
            }else{

            }
        }else{
            alert('Заполните обязательные поля')
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req'); //присваиваем в переменную все объекты с классом _req (обязатльными полями)
        
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);//перед началом роверки убираем класс ерор
            
            //проверяем эмейл
            if (input.classList.contains('_email')) {
                if(emailTest(input)){//если эмэйл написан с ошибкой, то добаляем клас  ерор 
                    formAddError(input);
                    error++;
                }
            }else if (input.getAttribute("type") === "checkbox" && input.checked === false){//если это не чекбокс и не отмечен, то добавляем класс ерор
                formAddError(input);
                error++;
            }else{
                if (input.value === '') {// проверка заполнено ли поле вообще
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;//возвращаем либо 0 либо больше 0
    }


    function formAddError(input){//добавлет класс ерор самому объэкту и родительскому объэкту
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){//убирает класс ерор у самого объэкта и родительского объэкта
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Функция теста email
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    //Получаем в константу инпут файл
    const formImage = document.getElementById('formImage');
    //Получаем в константу див для превью
    const formPreview = document.getElementById('formImage');

    //Слушаем изменения в инпуте файл
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        //проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения.');
            formImage.value = '';
            return;
        }
        //проверим размер файла (>2Мб)
        if (file.size > 2 * 1024 *1024) {
            alert('Файл должен быть менее 2 Мб. ');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e){//когда файл успешно загружен мы помежаем фото в formPreview
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);

    }


});