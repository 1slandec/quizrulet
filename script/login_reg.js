const loginButton = document.querySelector('#submitLogin');
const regButton = document.querySelector('#submitRegister');


regButton.addEventListener('click',
    async function register(e) { //Обработать badRequest

        e.preventDefault();
        const login = document.getElementById('loginInput').value.trim();
        const pass = document.getElementById('passwordInput').value.trim();
        const secondPass = document.getElementById('passwordConfirmInput').value.trim();

        if (login === "") {
            showModal("Ошибка", "Логин пустой");
            return;
        }

        if (pass !== secondPass) {
            showModal("Ошибка", "Пароли не совпадают");
            return;
        }

        const response = await axios.post("/register",
            {
                login: login,
                password: pass
            }
        )
        await login(login,pass);
    })



loginButton.addEventListener('click',
    async function () {
        const userLogin = document.querySelector('#loginInput');
        const userPass = document.querySelector('#passwordInput');
        await login(userLogin, userPass);
    });


async function login(userLogin, userPass) {

    e.preventDefault();
    const response = await axios.post("/login", {
        login: userLogin,
        password: userPass
    })

    if (response.ok) {
        window.location.href = '/index.html';
    }
    else {
        alert(response.text());
    }
}