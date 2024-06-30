let splash = document.querySelector('.splash');
let logo = document.querySelector('.splash-header');
let logoSpan = document.querySelectorAll('.splash-logo');

window.onload = () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            splash.style.top = '-100vh';
            splash.style.borderRadius = '0 0 30px 30px';
        }, 2250);
    }, 0);
};
