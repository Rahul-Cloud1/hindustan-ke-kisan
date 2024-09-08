document.addEventListener("DOMContentLoaded", function() {
    // Product category functionality
    const categoryLinks = document.querySelectorAll(".category-link");
    const productCategories = document.querySelectorAll(".product-category");

    categoryLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const category = this.getAttribute("data-category");

            // Hide all categories
            productCategories.forEach(categoryDiv => {
                categoryDiv.classList.remove("active");
            });

            // Show selected category or all if "all" is clicked
            if (category === "all") {
                productCategories.forEach(categoryDiv => {
                    categoryDiv.classList.add("active");
                });
            } else {
                document.getElementById(category).classList.add("active");
            }
        });
    });

    // Show all products initially (or default category)
    document.querySelectorAll(".product-category")[0].classList.add("active");

    // Search functionality
    const searchInput = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-button');
    
    // Handle search on click or enter
    searchButton.addEventListener('click', function() {
        handleSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    function handleSearch() {
        const query = searchInput.value.toLowerCase();
        const allProducts = document.querySelectorAll('.product');

        allProducts.forEach(product => {
            const productName = product.querySelector('h3').innerText.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = 'inline-block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Header icon functionality (for example, profile, cart, etc.)
    const profileIcon = document.querySelector('.icon-box .profile-icon');
    const cartIcon = document.querySelector('.icon-box .cart-icon');
    const notificationIcon = document.querySelector('.icon-box .notification-icon');

    profileIcon.addEventListener('click', function() {
        // Redirect to profile page or show profile details
        window.location.href = 'profile.html';
    });

    cartIcon.addEventListener('click', function() {
        // Redirect to cart page or show cart details
        window.location.href = 'cart.html';
    });

    notificationIcon.addEventListener('click', function() {
        // Show notifications dropdown or redirect
        alert('No new notifications.');
    });
});
