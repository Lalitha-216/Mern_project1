const grid = document.querySelector(".products-grid");
const searchInput = document.querySelector(".search");
const categorySelect = document.getElementById("categoryFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const shopNowBtn = document.getElementById("shopNowBtn");

let products = [];

function formatPrice(price){
    return "₹" + price.toLocaleString("en-IN");
}

function createCard(p){

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <img src="${p.image}" class="product-img">

        <div class="product-info">
            <h3>${p.name}</h3>
            <p class="category">${p.category}</p>
            <p class="price">₹${p.price}</p>

            <div class="actions">
                <button onclick="viewProduct('${p._id}')">View</button>
                <button onclick="addToCart('${p._id}')">Add to Cart</button>
            </div>
        </div>
    `;

    return card;
}

function render(list){

    grid.innerHTML = "";

    list.forEach(p=>{
        grid.appendChild(createCard(p));
    });

}

async function loadProducts(){

    try{

        const res = await fetch("http://localhost:5000/api/products");
        products = await res.json();

        console.log(products);

        render(products);

    }catch(err){

        console.log(err);

    }

}
function filterProducts(){

    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    const maxPrice = Number(priceRange.value);

    const filtered = products.filter(p => {

        const matchSearch =
            p.name.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search);

        const matchCategory =
            category === "All" || p.category === category;

        const matchPrice =
            p.price <= maxPrice;

        return matchSearch && matchCategory && matchPrice;

    });

    render(filtered);
}

function viewProduct(id){

    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";

}

function addToCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if(existing){
        existing.qty += 1;
    }else{
        cart.push({id:id, qty:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
}

document.addEventListener("DOMContentLoaded", loadProducts);
searchInput.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);

priceRange.addEventListener("input", () => {

    priceValue.innerText = "Up to ₹" + priceRange.value;

    filterProducts();

});