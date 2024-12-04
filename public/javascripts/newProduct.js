document.getElementById('new-product-form').addEventListener('submit', async function(event) {
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

    try {
    const response = await fetch('/admin/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message || 'Product added successfully');
        window.location.href = '/admin/products';  // Redirect to the admin products page
    } else {
        alert(result.error || 'Failed to add product');
    }
} catch(error) {
    console.error('Error:', error);
    alert('Failed to add product: ' + error.message);
    }
});