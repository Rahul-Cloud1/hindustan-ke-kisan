document.addEventListener('DOMContentLoaded', () => {
    // Sample data: this would typically come from the database
    let products = [
        { name: 'Power Weeder PW1', price: 20000, salePrice: 18000, category: 'Power Weeders' },
        { name: 'Lawn Mower LM1', price: 15000, salePrice: 13000, category: 'Lawn Mowers' },
    ];

    // Function to render products to the table
    function renderProducts() {
        const productTableBody = document.querySelector('#productTable tbody');
        productTableBody.innerHTML = ''; // Clear previous products

        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.salePrice}</td>
                <td>${product.category}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Add event listeners for Edit and Delete buttons
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', editProduct);
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', deleteProduct);
        });
    }

    // Add Product Form submission handler
    document.querySelector('#productForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const newProduct = {
            name: document.querySelector('#name').value,
            price: document.querySelector('#price').value,
            salePrice: document.querySelector('#salePrice').value,
            category: document.querySelector('#category').value,
        };

        products.push(newProduct); // Add new product to the list
        renderProducts(); // Re-render the product table
        this.reset(); // Reset the form
    });

    // Edit Product
    function editProduct(e) {
        const index = e.target.dataset.index;
        const product = products[index];

        // Populate the form with product data for editing
        document.querySelector('#name').value = product.name;
        document.querySelector('#price').value = product.price;
        document.querySelector('#salePrice').value = product.salePrice;
        document.querySelector('#category').value = product.category;

        // Remove the old product
        products.splice(index, 1);
    }

    // Delete Product
    function deleteProduct(e) {
        const index = e.target.dataset.index;
        products.splice(index, 1); // Remove product from list
        renderProducts(); // Re-render the table
    }

    // Initial render of products
    renderProducts();
});
