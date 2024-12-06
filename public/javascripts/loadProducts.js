function loadProducts(event) {
    if (event) {
        event.preventDefault();
    }
    fetch('/admin/products/load')
    // json() konverterar json till javascript
        .then(response => response.json()) 
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.SKU}</td>
                    <td>${product.price}</td>
                    <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                    <td>${product.brand}</td>
                    <td>
                        <button class="delete-button" data-id="${product.id}">Delete</button>
                    </td>
                `;
                productList.appendChild(row);
            });

            // Add event listeners to delete buttons
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    deleteProduct(productId);
                });
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

function deleteProduct(productId) {
    fetch('/delete-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${productId}`
    })
    .then(response => {
        if (response.ok) {
            loadProducts(); // Reload products after deletion
        } else {
            console.error('Error deleting product:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting product:', error));
}