document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const usersData = document.getElementById('users-data');

    function renderUserData(users) {
        preloader.style.display = 'none';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Username: ${user.username}, Name: ${user.name}, Email: ${user.email}, Address: ${user.address.city}, Phone: ${user.phone}, Website: ${user.website}, Company: ${user.company.name}`;
            usersData.appendChild(li);
        });
    }

    function fetchData(url) {
        preloader.style.display = 'block';
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Service response is not ok');
                }
                return response.json();
            })
            .catch(error => {
                preloader.style.display = 'none';
                console.error('Error fetching data:', error);
                usersData.innerHTML = '<p>⚠ Что-то пошло не так</p>';
            });
    }

    fetchData('https://jsonplaceholder.typicode.com/users?_start=0&_limit=5')
        .then(data => renderUserData(data));

    setTimeout(() => {
        fetchData('https://jsonplaceholder.typicode.com/users?_start=5&_limit=5')
            .then(data => renderUserData(data));
    }, 5000);
});
