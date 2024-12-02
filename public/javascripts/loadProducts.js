function loadProducts(event) {
    if (event) {
        event.preventDefault();
    }
    fetch('/admin/products/load')
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
                    <td><a href="/admin/products/edit/${product.id}">Edit</a></td>
                `;
                productList.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}