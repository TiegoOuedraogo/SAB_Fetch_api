document.addEventListener('DOMContentLoaded', function() {
    function getSearchParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            query: urlParams.get('query'),
            product_type: urlParams.get('product_type'),
            brand: urlParams.get('brand'),
            price_greater_than: urlParams.get('price_greater_than'),
            price_less_than: urlParams.get('price_less_than'),
            rating_greater_than: urlParams.get('rating_greater_than'),
            rating_less_than: urlParams.get('rating_less_than')
        };
        return params;
    }

    function fetchSearchResults(params) {
        let apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?`;
        apiUrl += `brand=${params.brand || ''}&`;
        apiUrl += `brand=${params.name || ''}&`;
        apiUrl += `product_type=${params.product_type || ''}&`;
        apiUrl += `price_greater_than=${params.price_greater_than || ''}&`;
        apiUrl += `price_less_than=${params.price_less_than || ''}&`;
        apiUrl += `rating_greater_than=${params.rating_greater_than || ''}&`;
        apiUrl += `rating_less_than=${params.rating_less_than || ''}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error('Error:', error));
    }

    function displayResults(data) {
        const container = document.querySelector('.search-results-container');
        container.innerHTML = ''; // Clear existing results
    
        if (data.length === 0) {
            container.innerHTML = '<p>No products found.</p>';
            return;
        }
    
        data.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <img src="${product.image_link}" alt="${product.name}" height="100">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: ${product.price} ${product.price_sign || ''}</p>
                <p>Rating: ${product.rating || 'Not rated'}</p>
                <!-- Add more product details here -->
            `;
            container.appendChild(productElement);
        });
    }
    

    const searchParams = getSearchParameters();
    fetchSearchResults(searchParams);
});
