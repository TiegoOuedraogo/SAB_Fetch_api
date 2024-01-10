document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality
    let dropdown = document.querySelector('.auth-dropdown');
    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdown.querySelector('.dropdown-content').classList.toggle('show');
    });
});

    window.addEventListener('click', function() {
        if (dropdown.querySelector('.dropdown-content').classList.contains('show')) {
            dropdown.querySelector('.dropdown-content').classList.remove('show');
        }
    });