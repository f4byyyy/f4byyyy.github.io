//linecounter:

function addLineCounter(pre) {

    let lines = pre.innerHTML.split("\n");
    pre.innerHTML = '';
    for(let i = 0; i < lines.length; i++) {
        var span = document.createElement('span');
        span.className = 'line';
        span.innerHTML = lines[i];
        pre.appendChild(span);
        pre.appendChild(document.createTextNode('\n'));
    }

}

window.addEventListener('load', function () {
    let pres = document.getElementsByTagName('pre');
    for (let i = 0; i < pres.length; i++) {
        addLineCounter(pres[i]);
    }
}, false);



//menu:

let menuOpen = false;

function toggleMobileMenu() {

    let mobileMenu = document.getElementById('mobile_menu');

    if(!menuOpen) {
        mobileMenu.style.display = 'initial';
        mobileMenu.classList.add('mobile_menu_open_animation');

        document.getElementsByClassName('bar1')[0].classList.remove('bar1-close');
        document.getElementsByClassName('bar1')[0].classList.add('bar1-open');
        document.getElementsByClassName('bar2')[0].classList.remove('bar2-close');
        document.getElementsByClassName('bar2')[0].classList.add('bar2-open');
        document.getElementsByClassName('bar3')[0].classList.remove('bar3-close');
        document.getElementsByClassName('bar3')[0].classList.add('bar3-open');

        document.getElementById('menu_text').innerHTML = 'Close';

        document.getElementsByTagName('body')[0].style.height = '100%';
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';

        window.scrollTo(0, 0);

        menuOpen = true;
    } else {
        mobileMenu.style.display = 'none';
        mobileMenu.classList.remove('mobile_menu_open_animation');

        document.getElementsByClassName('bar1')[0].classList.remove('bar1-open');
        document.getElementsByClassName('bar1')[0].classList.add('bar1-close');
        document.getElementsByClassName('bar2')[0].classList.remove('bar2-open');
        document.getElementsByClassName('bar2')[0].classList.add('bar2-close');
        document.getElementsByClassName('bar3')[0].classList.remove('bar3-open');
        document.getElementsByClassName('bar3')[0].classList.add('bar3-close');

        document.getElementById('menu_text').innerHTML = 'Menu';

        document.getElementsByTagName('body')[0].style.height = '';
        document.getElementsByTagName('body')[0].style.overflowY = 'auto';

        menuOpen = false;
    }

}

//close menu when window is resized to greater width

window.addEventListener('resize', function() {

    if(!window.matchMedia("screen and (max-width: 700px)").matches && menuOpen) {
        toggleMobileMenu();
    }

});



//scrolling:

function scrollToProjects() {
    try {
        document.getElementById('projects_anchor').scrollIntoView({ behavior: 'smooth' });
    } catch(err) {
        document.getElementById('projects_anchor').scrollIntoView(true);
    }
}

function scrollToAboutMe() {
    try {
        document.getElementById('about_anchor').scrollIntoView({ behavior: 'smooth' });
    } catch(err) {
        document.getElementById('about_anchor').scrollIntoView(true);
    }
}

function scrollToContact() {
    try {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    } catch(err) {
        document.getElementById('contact').scrollIntoView(true);
    }
}

function scrollToTop() {
    try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(err) {
        window.scrollTo(0, 0);
    } 
}