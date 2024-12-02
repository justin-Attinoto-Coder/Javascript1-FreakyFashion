document.getElementById('new-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value,
        brand: document.getElementById('brand').value,
        sku: document.getElementById('sku').value,
        price: document.getElementById('price').value,
        publishingDate: document.getElementById('publishingDate').value
    };

    fetch('/admin/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/admin/products';
        } else {
            return response.json().then(error => {
                throw new Error(error.message);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add product: ' + error.message);
    });
});