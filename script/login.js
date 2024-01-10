document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form form');
    const facebookLoginButton = document.querySelector('.facebook');
    const instagramLoginButton = document.querySelector('.instagram');

    // Form validation using Regex
    function validateForm() {
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Adjust as needed

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
        if (!validateForm()) return; // Stop submission if the form is invalid

        // AJAX request to submit form data
        const formData = new FormData(form);
        fetch('/submit-login', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));

        console.log('Form submitted!');
    });


    facebookLoginButton.addEventListener('click', function() {
        console.log('FaceBook login clicked');
        const facebookAuthUrl = 'https://www.facebook.com/login/';
    
        const popupWindow = window.open(facebookAuthUrl, 'FaceBookLogin', 'width=800,height=600');
        
        const popupTick = setInterval(function() {
            if (popupWindow.closed) {
                clearInterval(popupTick);
                console.log('FaceBook login popup closed');
            }
        }, 500);
    });

    // Placeholder for Instagram login logic
    instagramLoginButton.addEventListener('click', function() {
        console.log('Instagram login clicked');
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
