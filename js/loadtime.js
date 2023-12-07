(function () {
    function measurePageLoadTime() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const loadTime = entries[0].domComplete;
            displayPageLoadStats(loadTime);
        });

        observer.observe({ entryTypes: ['navigation'] });
    }

    function formatTime(milliseconds) {
        const seconds = milliseconds / 1000;
        return seconds.toFixed(3) + ' сек.';
    }

    function displayPageLoadStats(loadTime) {
        const formattedTime = formatTime(loadTime);

        const statsContainer = document.createElement('div');
        statsContainer.style.cssText = '' +
            'position: absolute;' +
            'bottom: 75px;' +
            'left: 0;' +
            'background-color: #292929;' +
            'color: #7D7D7D;' +
            'width: 100%;' +
            'text-align: center;' +
            'padding-top: 10px;' +
            'padding-bottom: 10px;';
        statsContainer.innerHTML = `Время загрузки страницы: ${formattedTime}`;

        document.body.appendChild(statsContainer);
    }

    measurePageLoadTime();
})();
