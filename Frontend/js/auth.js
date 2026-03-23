const API = "http://localhost:5000/api/users";

async function registerUser(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,password})
    });

    const data = await res.json();

    alert(data.message);

    window.location.href="login.html";
}


async function loginUser(e){
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.user){

        localStorage.setItem("user",JSON.stringify(data.user));

        alert("Login successful");

        window.location.href="index.html";

    }else{

        alert("Invalid credentials");

    }

}