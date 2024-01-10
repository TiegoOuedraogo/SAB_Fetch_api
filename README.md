# SAB_Fetch_api
# Makeup Products Catalog

## Project Overview
This web application allows users to interact with a makeup products catalog. It provides functionalities for searching, displaying, and manipulating makeup product data using the Makeup API. Users can view products, search based on various criteria, and manage product data.

## Features
- **Search Functionality**: Users can search for makeup products based on brand, product type, price range, and ratings.
- **Product Display**: Products are displayed with details including name, image, price, and ratings.
- **Pagination**: Supports pagination for easy navigation through product listings.
- **Dynamic Interaction**: Users can create, update, and delete products in the catalog (Note: This functionality might be simulated if the API doesn't support these operations).

## How to Run the Application
1. **Clone the Repository**:
2. **Navigate to the Project Directory**:
3. **Open the `index.html` file in a Web Browser**.

## Technologies Used
- HTML
- CSS
- JavaScript
- [Makeup API](http://makeup-api.herokuapp.com/)

## Functionality Breakdown
- **`buildApiUrl`**: Constructs the URL for API requests based on user-defined filters and pagination settings.
- **`displayProducts`**: Renders the products on the webpage.
- **`fetchProducts`**: Fetches product data from the Makeup API.
- **`displayPagination`**: Handles the pagination feature.
- **`createProduct`, `updateProduct`, `deleteProduct`**: Functions for creating, updating, and deleting products (subject to API capabilities).

## Limitations
- The application's capability to create, update, or delete products depends on the API's support for these operations.
- The application is designed for modern web browsers and may not support outdated versions.

## Future Enhancements
- Implement more advanced filtering options.
- Improve responsiveness for better mobile compatibility.
- Add user authentication for managing personal product lists.

## Developers
- Tiego Ouedraogo

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
Thanks to the Makeup API for providing the data used in this project.
