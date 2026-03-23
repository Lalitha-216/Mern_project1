const TAX = 50;

// ---------- ADD TO CART ----------
function addToCart(name, price, qty = 1) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// ---------- RENDER CART (cart.html) ----------
function renderCart() {
    const cartBody = document.getElementById("cart-body");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    // If not on cart page → stop
    if (!cartBody) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartBody.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <input type="number" min="1" value="${item.qty}"
                       data-index="${index}" class="qty-input">
            </td>
            <td>₹${itemTotal}</td>
            <td>
                <button data-index="${index}" class="remove-btn">X</button>
            </td>
        `;

        cartBody.appendChild(row);
    });

    subtotalEl.textContent = subtotal;
    totalEl.textContent = subtotal + TAX;

    attachEvents();
}

// ---------- EVENTS ----------
function attachEvents() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Quantity change
    document.querySelectorAll(".qty-input").forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            cart[index].qty = parseInt(e.target.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });

    // Remove item
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });
}

// ---------- LOAD CART WHEN PAGE READY ----------
document.addEventListener("DOMContentLoaded", renderCart);
