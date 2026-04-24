const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', function() {
    // Schimbă starea butonului hamburger
    menu.classList.toggle('is-active');
    // Afișează sau ascunde meniul
    menuLinks.classList.toggle('active');
});