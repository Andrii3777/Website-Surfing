"use strict"

//Меню бургер
const iconMenu = document.querySelector('.menu__icon'); //получаем в констнту класс менюайкон
const menuBody = document.querySelector('.menu__body'); //получаем в констнту класс менюбоди
if(iconMenu){//проверка есть ди такой класс
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');//запрещаем скролить страницу при открытом меню
        iconMenu.classList.toggle('_active');//добаляем либо убираем класс эктив для самой иконки
        menuBody.classList.toggle('_active');//добаляем либо убираем класс эктив для самой иконки
    });
}






//Прокрутка при клике
let gotoBlockValue = 0;
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');//собираем массив объэктов которые учавствуют в навигации

if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        //вешаем событие клик
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    //получаем объэкт на которые кликаем
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        // проверяем заполнен ли этот дата атрибут существует ли объэкт на который ссылается данный дата атрибут
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            //выщитываем положение этого объекта с учетом высоты шапки   //местоположение объэкта на старнице в пикселях + количевство прокрученных пикселей - высота шапки ( - document.querySelector('header').offsetHeight)
            if(gotoBlock.getBoundingClientRect().top < pageYOffset)
            {
                gotoBlockValue = gotoBlock.getBoundingClientRect().top  + pageYOffset - document.querySelector('header').offsetHeight;
            }
            else if (gotoBlock.getBoundingClientRect().top > pageYOffset)
            {
                gotoBlockValue = gotoBlock.getBoundingClientRect().top  + pageYOffset;
            }
            

            //закрываем меню бургер при нажатии на пункт меню
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');//запрещаем скролить страницу при открытом меню
                iconMenu.classList.remove('_active');//убираем класс эктив для самой иконки
                menuBody.classList.remove('_active');//убираем класс эктив для самой иконки
            }


            //засталяем скрол прокрутится к нужному месту
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth" //плавная прокрутка
            });
            e.preventDefault(); //отключаем работу ссылки
        }
    }
}