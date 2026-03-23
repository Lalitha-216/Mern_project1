async function loadProduct() {

    const id = localStorage.getItem("selectedProduct");

    try {

        const res = await fetch("http://localhost:5000/api/products");
        const products = await res.json();

        const product = products.find(p => p._id === id);

        if (!product) return;

        document.querySelector(".product-image img").src = product.image;
        document.querySelector(".product-info h2").textContent = product.name;
        document.querySelector(".price").textContent = "₹" + product.price;
        document.querySelector(".desc").textContent = product.description;

        setupQuantity(product);

    } catch(err){
        console.log(err);
    }
}


function setupQuantity(product) {

    const minus = document.querySelector(".quantity button:first-child");
    const plus = document.querySelector(".quantity button:last-child");
    const qtySpan = document.querySelector(".quantity span");
    const addBtn = document.querySelector(".add-cart");

    let qty = 1;

    plus.addEventListener("click", () => {
        qty++;
        qtySpan.textContent = qty;
    });

    minus.addEventListener("click", () => {
        if (qty > 1) qty--;
        qtySpan.textContent = qty;
    });

    addBtn.addEventListener("click", () => {
        addToCart(product.name, product.price, qty);
    });
}


document.addEventListener("DOMContentLoaded", loadProduct);