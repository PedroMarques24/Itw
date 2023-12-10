function DarkMode() {
    var body = document.body;
    body.classList.toggle('dark-mode');

    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('navbar-dark');
    navbar.classList.toggle('navbar-light');
}