const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const giveawayForm = document.getElementById('giveaway-form');
const findForm = document.getElementById('find-form');
const logOutButton = document.getElementById('logout');

updateTime();
setInterval(updateTime, 1000);

document.addEventListener('DOMContentLoaded', function() {

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData= new FormData(loginForm);
        let urlEncodedData = new URLSearchParams(formData).toString();

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        }).then(response => response.json())
        .then(data => {
            document.getElementById('login-msg').innerText = data.message;
            if(data.success) {
                sessionStorage.setItem('username', formData.get('username'));
            }
        }).catch(error => {
            console.error('Fetch error: ', error);
            document.getElementById('login-msg').innerText = 'Error processing request';
        })
    });

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData= new FormData(signupForm);
        let urlEncodedData = new URLSearchParams(formData).toString();

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData
        }).then(response => response.json())
        .then(data => {
            document.getElementById('signup-msg').innerText = data.message;
        }).catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('signup-msg').innerText = 'Error processing request.';
        });
    });
});      

document.addEventListener('DOMContentLoaded', function() {
    findForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(findForm);
        const queryString = new URLSearchParams(formData).toString();

        fetch(`/find?${queryString}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        }).then(response => response.json())
        .then(data => {
            const petsContainer = document.querySelector('.browse');
            petsContainer.innerHTML = '';  // Clear existing pets
            data.forEach(pet => {
                const petDiv = document.createElement('div');
                petDiv.className = 'pet';
                petDiv.innerHTML = `
                    <img src="/images/${pet[3].toLowerCase()}.jpg" alt="${pet[3]}">
                    <div class="pet-info">
                        ${pet[2]} ; ${pet[3]} ; ${pet[4]} ; ${pet[5]} ; ${pet[6]}, ${pet[7]} and ${pet[8]} ; ${pet[9]} ; ${pet[10]} ; ${pet[11]}
                        <br><button name="interested">Interested!</button>
                    </div>
                `;
                petsContainer.appendChild(petDiv);
            });
        }).catch(error => {
            console.error('Fetch error:', error);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    logOutButton.addEventListener('click', (event) => {
        console.log(logOutButton);
        event.preventDefault();
        console.log('logout clicked.')
        fetch('/logout' ,{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data.message)
            console.log(data.redirect)
            console.log(data.success)
            window.location.href = data.redirect;
            alert(data.message)
        }).catch(error => { 
            console.error('Logout failed: ', error);
            alert('Logout failed');
        });
    })
}); 


document.addEventListener('DOMContentLoaded', function() {
    const giveawayForm = document.getElementById('giveaway-form'); 
    giveawayForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(giveawayForm);
            let urlEncodedData = new URLSearchParams(formData).toString();

            fetch('/giveaway', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            }).then(response => response.json())
            .then(data => {
                document.getElementById('giveaway-msg').innerText = data.message;
            }).catch(error => {
                console.error('Fetch error:', error);
                document.getElementById('error').innerText = 'Failed to submit';
            });
        });
});

       

function updateTime() {
    var now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var str = '';
    str += days[now.getDay()] +', '+ now.getDate() +' '+ months[now.getMonth()] +' '+ now.getFullYear() +' '+ now.getHours() +':'+ now.getMinutes() +':'+ now.getSeconds();
    document.getElementById('date-time').innerHTML = str;
}