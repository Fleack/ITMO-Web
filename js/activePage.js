(function () {
    const currentPage = window.location.pathname.split('/').at(-1)

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
