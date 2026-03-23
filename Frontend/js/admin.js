const API = "http://localhost:5000/api/products";

const form = document.getElementById("productForm");
const productTable = document.getElementById("productTable");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    const res = await fetch(`${API}/add`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            price,
            category,
            image,
            description
        })
    });

    const data = await res.json();

    alert(data.message);

    loadProducts();

    form.reset();
});


async function loadProducts(){

    const res = await fetch(API);

    const products = await res.json();

    productTable.innerHTML="";

    products.forEach(p=>{

        const row = document.createElement("tr");

        row.innerHTML=`
        <td><img src="${p.image}" width="60"></td>
        <td>${p.name}</td>
        <td>₹${p.price}</td>
        <td>${p.category}</td>
        <td>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
        </td>
        `;

        productTable.appendChild(row);

    });

}

async function deleteProduct(id){

    await fetch(`${API}/${id}`,{
        method:"DELETE"
    });

    loadProducts();
}

loadProducts();