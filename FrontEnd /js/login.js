const btnSubmit = document.querySelector('.connexionBtn');

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            console.log(response);
            document.querySelector('.error').innerText = 'Email ou mot de passe incorrect.';
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location = "index.html";
    } catch (error) {
        console.error(`Une erreur s'est produite : ${error.message || error}`);
    }
};

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginUser(email, password);
});
