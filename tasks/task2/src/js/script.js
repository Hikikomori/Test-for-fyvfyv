const header = document.querySelector('.header'),
    headerInner = document.querySelector('.header__inner'),
    menuToggle = document.querySelector('.header__menu-toggle');

header.classList.remove('header--nojs');

menuToggle.addEventListener('click', () => {
    if (menuToggle .classList.contains('is-active')){
        menuToggle .classList.remove('is-active');
        headerInner.classList.remove('header__inner--show-menu');
    } else {
        menuToggle.classList.add('is-active');
        headerInner.classList.add('header__inner--show-menu');
    }
});

