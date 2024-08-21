const btnSubmit = document.querySelector('.connexionbtn');

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    let email = document.getElementById('mail').value;

    console.log(email);
    
    let password = document.getElementById('password').value;

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
    .then(function(response){
        if(!response.ok){
            console.log(response);
            
            document.querySelector('.error').innerText = 'Email ou mot de passe incorrect.';
        } else {
            response.json().then(function(data){
                localStorage.setItem('token', data.token);
            })
            window.location = "index.html";
        }
    })
    .catch(error =>
        console.log('error: ' + error)
    );
})

