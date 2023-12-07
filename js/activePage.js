(function () {
    const currentPage = window.location.pathname.substring(10)

    console.log(currentPage)

    function highlightActiveMenuItem() {
        const menuItems = document.querySelectorAll('.site-pages a');

        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('load', highlightActiveMenuItem);
})();
