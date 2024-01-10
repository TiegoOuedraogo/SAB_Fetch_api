// Function to build the API URL
function buildApiUrl(filters, page = 1, pageSize = 35) {
    let baseUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json?';
    let queryParts = [];

    if (filters.brand) {
        queryParts.push(`brand=${encodeURIComponent(filters.brand)}`);
    }
    if (filters.product_type) {
        queryParts.push(`product_type=${encodeURIComponent(filters.product_type)}`);
    }
    if (filters.name) {
        queryParts.push(`name=${encodeURIComponent(filters.name)}`);
    }
    if (filters.price_greater_than) {
        queryParts.push(`price_greater_than=${encodeURIComponent(filters.price_greater_than)}`);
    }
    if (filters.price_less_than) {
        queryParts.push(`price_less_than=${encodeURIComponent(filters.price_less_than)}`);
    }
    if (filters.rating_greater_than) {
        queryParts.push(`rating_greater_than=${encodeURIComponent(filters.rating_greater_than)}`);
    }
    if (filters.rating_less_than) {
        queryParts.push(`rating_less_than=${encodeURIComponent(filters.rating_less_than)}`);
    }

    queryParts.push(`page=${page}`);
    queryParts.push(`pageSize=${pageSize}`);

    return baseUrl + queryParts.join('&');
}


// Function to display products
    function displayProducts(products, page = 1, pageSize = 35) {
        const container = document.querySelector('.product-container');
        container.innerHTML = '';
    
        // Calculate start and end index for current page
        let totalPages = Math.ceil(products.length / pageSize);
        let start = (page - 1) * pageSize;
        let end = start + pageSize;
        let paginatedItems = products.slice(start, end);        

        paginatedItems.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            //let starsHtml = generateStarsHtml(products.rating);
            productElement.innerHTML = `
                <img src="${product.api_featured_image}" alt="${product.name}">
                <h3>${product.name}</h3>
            
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
               
                <p>${product.price} ${product.price_sign || ''}</p>
            `;
            container.appendChild(productElement);
        });
    
        displayPagination(page, totalPages);
          
    }
    
// Function to fetch products
async function fetchProducts(filters) {
    const url = buildApiUrl(filters);
    try {
        const response = await fetch(url);
        const products = await response.json();
        //console.log('Line 65 Fetched products:', products); 
        allProducts = products; 
        displayProducts(products); 
    } catch (error) {
        console.error('Error:', error);
    }
}


// Function to display pagination
function displayPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = '';

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) displayProducts(allProducts, currentPage - 1, 20);
    });

    // Current Page Button
    const currentPageButton = document.createElement('button');
    currentPageButton.innerText = currentPage;
    currentPageButton.disabled = true; // Current page is not clickable

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) displayProducts(allProducts, currentPage + 1, 20);
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(currentPageButton);
    paginationContainer.appendChild(nextButton);
}

let allProducts = [];

// Function to get filters from the form
function getFiltersFromForm() {
    const form = document.querySelector('.nav-search-form');
    return {
        product_type: form.product_type.value,
        brand: form.brand.value,
        name: form.name.value,
        price_greater_than: form.price_greater_than.value,
        price_less_than: form.price_less_than.value,
        rating_greater_than: form.rating_greater_than.value,
        rating_less_than: form.rating_less_than.value
    };
}

function generateStarsHtml(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="fa fa-star ${rating >= i ? 'checked' : ''}"></span>`;
    }
    return starsHtml;
}
// Event listener for the search form
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.nav-search-form');
    const initialFilters = {};

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const filters = getFiltersFromForm();
        console.log('line 128 Filters:', filters);
        fetchProducts(filters);
    });

    fetchProducts(initialFilters);
});

async function createProduct(productData) {
    const url = `https://659dc59047ae28b0bd34d800.mockapi.io/api/v1/Makeup`;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    };

    console.log("Request URL:", url);
    console.log("Request Options:", requestOptions);

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorData = await response.text(); // Using text to get raw response body
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorData}`);
        }

        return await response.json();
    } catch (error) {
        console.error('POST error:', error);
    }
}


createProduct().then(response => console.log("Created Product:", response))
  .catch(error => console.error("Error in createProduct:", error));

  async function deleteAndCreateProduct() {
    try {
        // Try deleting a product
        const productIdToDelete = 'existingProductId'; 
        const deleteResponse = await deleteProduct(productIdToDelete);
        console.log(`Product with ID ${productIdToDelete} deleted:`, deleteResponse);

        // Then try creating a new product
        const newProductData = {
            "name": "Alexis Sporer",
            "description": "Hybrid",
            "price": "303.00",
            "images": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/90.jpg",
            "rating": 14949
        };
        const createResponse = await createProduct(newProductData);
        console.log("Created new product:", createResponse);
    } catch (error) {
        console.error("Error in deleteAndCreateProduct:", error);
    }
}

deleteAndCreateProduct();


    async function getProduct(productId) {
        try {
            const response = await fetch(`https://659dc59047ae28b0bd34d800.mockapi.io/api/v1/Makeup/${productId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('GET error:', error);
        }
    }
    async function updateProduct(productId, updatedData) {
        try {
            const response = await fetch(`https://659dc59047ae28b0bd34d800.mockapi.io/api/v1/Makeup/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('PUT error:', error);
        }
    }
    async function deleteProduct(productId) {
        try {
            const response = await fetch(`https://659dc59047ae28b0bd34d800.mockapi.io/api/v1/Makeup/${productId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('DELETE error:', error);
        }
    }
    