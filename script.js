function lockBodyScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) { document.body.style.paddingRight = scrollBarWidth + 'px' }
    document.body.style.overflow = 'hidden'
}
function unlockBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id], main[id]'));
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const navList = document.querySelector('.nav-list');
            if (navList && navList.classList.contains('show')) { navList.classList.remove('show') }
        })
    });
    const observerOptions = { root: null, rootMargin: '-40% 0% -40% 0%', threshold: 0 };
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        })
    }, observerOptions);
    sections.forEach(sec => io.observe(sec));
    const mobileToggle = document.getElementById('mobileToggle');
    const navList = document.querySelector('.nav-list');
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => { navList.classList.toggle('show') });
        document.addEventListener('click', (e) => { if (!navList.contains(e.target) && !mobileToggle.contains(e.target)) { navList.classList.remove('show') } });
        window.addEventListener('resize', () => { if (window.innerWidth > 980) { navList.classList.remove('show') } })
    }
});
