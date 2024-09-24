alert("Careसेतु is a platform where we provide OPD Registrations, Bed Booking with Occupancy details & Emergency services during Accidents including Inter-Hospital Transfer!")
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
});
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('active');
    });
});