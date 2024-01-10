async function fetchBrandInformation(brandName) {
    try {
        const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayBrandInformation(data);
    } catch (error) {
        console.error('Error fetching brand information:', error);
    }
    fetchBrandInformation('someBrandName');

}


function displayBrandInformation(data) {
    const container = document.getElementById('brand-info-container');
    container.innerHTML = ''; 

    // Check if data is not empty
    if (!data || data.length === 0) {
        container.innerHTML = '<p>No brand information available.</p>';
        return;
    }

    data.forEach(product => {
        const brandInfoElement = document.createElement('div');
        brandInfoElement.classList.add('brand-info');


        brandInfoElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image_link}" alt="${product.name}">
            <p>Product Type: ${product.product_type}</p>
            <p>Price: ${product.price} ${product.price_sign || ''}</p>
            <p>Description: ${product.description}</p>
            <!-- Add more product details as needed -->
        `;

        container.appendChild(brandInfoElement);
    });
}

