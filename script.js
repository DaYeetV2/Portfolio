const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');
const topButton = document.querySelector('.top');
const navLinks = document.querySelectorAll('.nav a');
const sections = document.querySelectorAll('main section[id]');

function updateScrollState() {
    const scrolled = window.scrollY > 30;
    header.classList.toggle('scrolled', scrolled);
    topButton.classList.toggle('visible', window.scrollY > window.innerHeight * 0.65);

    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}

menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();
