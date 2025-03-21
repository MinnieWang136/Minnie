window.addEventListener('scroll', function() {
    let floatingBox = document.getElementById('floatingBox');
    if (window.scrollY > 100) {
        floatingBox.style.transform = 'translateY(-20px)';
    } else {
        floatingBox.style.transform = 'translateY(0)';
    }
});