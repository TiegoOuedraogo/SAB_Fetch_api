document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form form');
    const facebookSignupButton = document.querySelector('.facebook');
    const instagramSignupButton = document.querySelector('.instagram');

    // Form validation using Regex
    function validateForm() {
        const username = form.querySelector('input[name="username"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;

        const usernameRegex = /^[a-zA-Z0-9]{3,}$/; // Adjust regex as needed
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 8 characters, one uppercase, one lowercase, and one number

        if (!usernameRegex.test(username)) {
            alert('Invalid username. Please try again.');
            return false;
        }
        if (!emailRegex.test(email)) {
            alert('Invalid email format. Please try again.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters and include uppercase, lowercase, and numbers.');
            return false;
        }

        return true; // Form is valid
    }

    // Form submission event
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) return;

        // AJAX request to submit form data
        const formData = new FormData(form);
        fetch('/submit-signup', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle signup success - redirect or show message
            alert('Signup successful! Redirecting to login...');
            window.location.href = 'login.html'; // Redirect to login page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        });
    });


instagramSignupButton.addEventListener('click', function() {
    console.log('Instagram signup clicked');
    const instagramAuthUrl = 'https://www.instagram.com/';

    const popupWindow = window.open(instagramAuthUrl, 'InstagramLogin', 'width=800,height=600');
    
    const popupTick = setInterval(function() {
        if (popupWindow.closed) {
            clearInterval(popupTick);
            console.log('Instagram login popup closed');
        }
    }, 500);
});

});
