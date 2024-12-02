/* const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const productData = {
        productName: formData.get('product-name'),
        sku: formData.get('sku'),
        price: formData.get('price'),
        // quantity: formData.get('quantity'),
        // description: formData.get('description'),
        // image: formData.get('image')
    };

    fetch('/admin/products/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });
}); */