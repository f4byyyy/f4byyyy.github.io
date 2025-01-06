if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
    document.getElementById('code-stylesheet').href = '../../res/highlightjs/styles/github-dark.min.css';
}

document.querySelectorAll('code').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/</g, "&lt;"); //make < and > characters work
    hljs.highlightElement(el);
});